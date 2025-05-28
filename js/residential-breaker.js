        // 回路データの初期化
        const circuits = [
            { id: 1, name: '玄関・廊下', capacity: 20, voltage: 100, phase: 'R', enabled: true, amperes: 0, watts: 0, appliances: [] },
            { id: 2, name: 'キッチン', capacity: 20, voltage: 100, phase: 'R', enabled: true, amperes: 0, watts: 0, appliances: [] },
            { id: 3, name: 'リビング', capacity: 20, voltage: 100, phase: 'R', enabled: true, amperes: 0, watts: 0, appliances: [] },
            { id: 4, name: '居室', capacity: 20, voltage: 100, phase: 'R', enabled: true, amperes: 0, watts: 0, appliances: [] },
            { id: 5, name: '洗面所・浴室', capacity: 20, voltage: 100, phase: 'T', enabled: true, amperes: 0, watts: 0, appliances: [] },
            { id: 6, name: '洗濯機', capacity: 20, voltage: 100, phase: 'T', enabled: true, amperes: 0, watts: 0, appliances: [], isELCB: true },
            { id: 7, name: 'エアコンリビング', capacity: 20, voltage: 200, phase: 'RT', enabled: true, amperes: 0, watts: 0, appliances: [], isDedicated: true },
            { id: 8, name: 'エアコン居室', capacity: 20, voltage: 100, phase: 'T', enabled: true, amperes: 0, watts: 0, appliances: [], isDedicated: true }
        ];
        
        // 主幹ブレーカー
        const mainBreaker = {
            capacity: 30, // 30A
            enabled: true
        };

        // 力率係数
        const powerFactor = 1.0; // 力率を1.0に設定

        // 安全係数
        const safetyFactor = 1.6; // 主幹容量推奨計算用の安全係数
        
        // ドラッグ中のアイテム
        let draggingItem = null;
        
        // 初期化
        document.addEventListener('DOMContentLoaded', function() {
            // ドラッグアンドドロップの設定
            setupDragAndDrop();
            
            // ブレーカークリックイベント
            setupBreakerClickEvents();
            
            // リセットボタンイベント
            document.getElementById('reset-system').addEventListener('click', resetSystem);
            document.getElementById('reset-all').addEventListener('click', resetAll);
            
            // 漏電ボタンイベント
            document.getElementById('trigger-leakage').addEventListener('click', triggerLeakage);
            
            // 専用回路トグルスイッチイベント
            setupDedicatedAppliances();
            
            // 主幹ブレーカーサイズ変更イベント
            document.getElementById('main-breaker-size').addEventListener('change', function() {
                const newCapacity = parseInt(this.value);
                mainBreaker.capacity = newCapacity;
                
                // 主幹ブレーカー表示更新
                document.getElementById('mlb-capacity').textContent = `${newCapacity}A`;
                
                // 総負荷計算
                calculateTotalLoad();
                
                // ブレーカー遮断チェック
                checkBreakerTrip();
            });
            
            // チュートリアルボタンイベント
            document.getElementById('show-tutorial').addEventListener('click', function() {
                showTutorial();
            });
        });
        
        // 専用回路アプライアンスのセットアップ
        function setupDedicatedAppliances() {
            const toggleSwitches = document.querySelectorAll('.dedicated-toggle');
            
            toggleSwitches.forEach(toggle => {
                toggle.addEventListener('change', function() {
                    const circuitId = parseInt(this.dataset.circuit);
                    const dedicatedElem = this.closest('.dedicated-appliance');
                    const statusDisplay = dedicatedElem.querySelector('.toggle-status');
                    
                    const applianceData = {
                        name: dedicatedElem.dataset.name,
                        watts: parseInt(dedicatedElem.dataset.watts),
                        amps: parseFloat(dedicatedElem.dataset.amps),
                        voltage: parseInt(dedicatedElem.dataset.voltage)
                    };
                    
                    // 回路の参照を取得
                    const circuit = circuits.find(c => c.id === circuitId);
                    
                    if (this.checked) {
                        // ONにする
                        statusDisplay.textContent = "ON";
                        statusDisplay.classList.remove('off');
                        statusDisplay.classList.add('on');
                        
                        // 専用回路に機器を追加 (実際にはappliances配列には入れず、直接ワット数と電流値を設定)
                        circuit.watts = applianceData.watts;
                        circuit.amperes = applianceData.amps;
                        
                        // 主幹ブレーカーが遮断中なら操作できない
                        if (!mainBreaker.enabled) {
                            showAlert('主幹ブレーカーが遮断されています。先に主幹ブレーカーを復旧してください。');
                            this.checked = false;
                            statusDisplay.textContent = "OFF";
                            statusDisplay.classList.remove('on');
                            statusDisplay.classList.add('off');
                            return;
                        }
                        
                        // ブレーカー容量チェック
                        if (circuit.amperes > circuit.capacity) {
                            showAlert(`${circuit.name}回路の負荷(${circuit.amperes.toFixed(1)}A)が容量(${circuit.capacity}A)を超えています。使用できません。`);
                            this.checked = false;
                            statusDisplay.textContent = "OFF";
                            statusDisplay.classList.remove('on');
                            statusDisplay.classList.add('off');
                            circuit.watts = 0;
                            circuit.amperes = 0;
                            return;
                        }
                    } else {
                        // OFFにする
                        statusDisplay.textContent = "OFF";
                        statusDisplay.classList.remove('on');
                        statusDisplay.classList.add('off');
                        
                        // 負荷を0に
                        circuit.watts = 0;
                        circuit.amperes = 0;
                    }
                    
                    // 回路負荷の表示を更新
                    updateCircuitDisplay(circuit);
                    
                    // 総負荷を計算
                    calculateTotalLoad();
                    
                    // ブレーカー遮断チェック
                    checkBreakerTrip();
                });
            });
        }
        
        // ドラッグアンドドロップの設定
        function setupDragAndDrop() {
            // 家電のドラッグ設定
            const appliances = document.querySelectorAll('.appliance');
            appliances.forEach(appliance => {
                appliance.setAttribute('draggable', 'true');
                appliance.addEventListener('dragstart', function(e) {
                    draggingItem = this;
                    e.dataTransfer.setData('text/plain', 'appliance'); // ダミーデータを設定
                    e.dataTransfer.effectAllowed = 'copy';
                    setTimeout(() => {
                        this.classList.add('dragging');
                    }, 0);
                });
                
                appliance.addEventListener('dragend', function() {
                    this.classList.remove('dragging');
                    draggingItem = null;
                });
            });
            
            // 部屋のドロップ設定
            const rooms = document.querySelectorAll('.room');
            rooms.forEach(room => {
                room.addEventListener('dragover', function(e) {
                    e.preventDefault();
                    e.dataTransfer.dropEffect = 'copy';
                    this.style.backgroundColor = '#dbeafe';
                });
                
                room.addEventListener('dragleave', function() {
                    this.style.backgroundColor = '';
                });
                
                room.addEventListener('drop', function(e) {
                    e.preventDefault();
                    this.style.backgroundColor = '';
                    
                    if (draggingItem) {
                        const roomId = parseInt(this.dataset.room);
                        const applianceData = {
                            name: draggingItem.dataset.name,
                            watts: parseInt(draggingItem.dataset.watts),
                            amps: parseFloat(draggingItem.dataset.amps),
                            voltage: parseInt(draggingItem.dataset.voltage)
                        };
                        
                        // 電圧チェック
                        const circuit = circuits.find(c => c.id === roomId);
                        if (circuit.voltage !== applianceData.voltage) {
                            // 電圧が異なる場合、200V機器は100V回路に、100V機器は200V回路に接続できない
                            if (circuit.voltage === 200 && applianceData.voltage === 100) {
                                showAlert(`警告: 100Vの${applianceData.name}を200V回路に接続することはできません。`);
                                return;
                            } else if (circuit.voltage === 100 && applianceData.voltage === 200) {
                                showAlert(`警告: 200Vの${applianceData.name}を100V回路に接続することはできません。`);
                                return;
                            }
                        }
                        
                        // 専用回路チェック
                        if (circuit.isDedicated) {
                            showAlert(`警告: ${circuit.name}は専用回路です。トグルスイッチでON/OFFしてください。`);
                            return;
                        }
                        
                        addApplianceToRoom(roomId, applianceData);
                    }
                });
            });
            
            // タッチデバイス用の実装（モバイル対応）
            appliances.forEach(appliance => {
                appliance.addEventListener('touchstart', function(e) {
                    draggingItem = this;
                    this.classList.add('dragging');
                    
                    // タッチ位置を記録
                    const touch = e.touches[0];
                    const offsetX = touch.clientX - this.getBoundingClientRect().left;
                    const offsetY = touch.clientY - this.getBoundingClientRect().top;
                    
                    // クローンを作成
                    const clone = this.cloneNode(true);
                    clone.style.position = 'absolute';
                    clone.style.opacity = '0.6';
                    clone.style.zIndex = '1000';
                    clone.style.pointerEvents = 'none';
                    clone.id = 'dragging-clone';
                    document.body.appendChild(clone);
                    
                    // タッチの動きに合わせてクローンを移動
                    const moveClone = function(e) {
                        e.preventDefault();
                        const touch = e.touches[0];
                        clone.style.left = (touch.clientX - offsetX) + 'px';
                        clone.style.top = (touch.clientY - offsetY) + 'px';
                    };
                    
                    // タッチ終了時の処理
                    const endTouch = function(e) {
                        document.removeEventListener('touchmove', moveClone);
                        document.removeEventListener('touchend', endTouch);
                        
                        // クローンを削除
                        if (clone.parentNode) {
                            clone.parentNode.removeChild(clone);
                        }
                        
                        // ドロップ先を確認
                        const touch = e.changedTouches[0];
                        const dropTarget = document.elementFromPoint(touch.clientX, touch.clientY);
                        const roomElement = dropTarget.closest('.room');
                        
                        if (roomElement) {
                            const roomId = parseInt(roomElement.dataset.room);
                            const applianceData = {
                                name: draggingItem.dataset.name,
                                watts: parseInt(draggingItem.dataset.watts),
                                amps: parseFloat(draggingItem.dataset.amps),
                                voltage: parseInt(draggingItem.dataset.voltage)
                            };
                            
                            // 電圧チェック
                            const circuit = circuits.find(c => c.id === roomId);
                            if (circuit.voltage !== applianceData.voltage) {
                                if (circuit.voltage === 200 && applianceData.voltage === 100) {
                                    showAlert(`警告: 100Vの${applianceData.name}を200V回路に接続することはできません。`);
                                } else if (circuit.voltage === 100 && applianceData.voltage === 200) {
                                    showAlert(`警告: 200Vの${applianceData.name}を100V回路に接続することはできません。`);
                                } else {
                                    addApplianceToRoom(roomId, applianceData);
                                }
                            } else if (circuit.isDedicated) {
                                showAlert(`警告: ${circuit.name}は専用回路です。トグルスイッチでON/OFFしてください。`);
                            } else {
                                addApplianceToRoom(roomId, applianceData);
                            }
                        }
                        
                        draggingItem.classList.remove('dragging');
                        draggingItem = null;
                    };
                    
                    document.addEventListener('touchmove', moveClone, { passive: false });
                    document.addEventListener('touchend', endTouch);
                });
            });
        }
        
        // 部屋に家電を追加
        function addApplianceToRoom(roomId, applianceData) {
            const circuit = circuits.find(c => c.id === roomId);
            
            // 家電を追加
            circuit.appliances.push(applianceData);
            
            // 回路の負荷を再計算
            calculateCircuitLoad(circuit);
            
            // 回路の描画を更新
            updateCircuitDisplay(circuit);
            
            // 部屋の家電を表示
            renderRoomAppliances(circuit);
            
            // 総負荷を計算
            calculateTotalLoad();
            
            // ブレーカー遮断チェック
            checkBreakerTrip();
        }
        
        // 回路負荷計算
        function calculateCircuitLoad(circuit) {
            let totalWatts = 0;
            let totalAmps = 0;
            
            // 専用回路の場合はすでに設定済みの値を使用
            if (circuit.isDedicated) {
                return;
            }
            
            circuit.appliances.forEach(appliance => {
                totalWatts += appliance.watts;
                totalAmps += appliance.amps;
            });
            
            circuit.watts = totalWatts;
            circuit.amperes = totalAmps;
            
            // 回路のブレーカー表示を更新
            const loadText = document.getElementById(`load-${circuit.id}`);
            if (loadText) {
                loadText.textContent = `${totalWatts}W (${totalAmps.toFixed(1)}A)`;
            }
            
            // 部屋の回路状態表示を更新
            const circuitStatus = document.getElementById(`circuit-status-${circuit.id}`);
            if (circuitStatus) {
                circuitStatus.textContent = `${totalWatts}W (${totalAmps.toFixed(1)}A)`;
            }
        }
        
        // 部屋の家電表示
        function renderRoomAppliances(circuit) {
            const roomContainer = document.querySelector(`.room[data-room="${circuit.id}"] .room-appliances`);
            roomContainer.innerHTML = '';
            
            circuit.appliances.forEach((appliance, index) => {
                const applianceElem = document.createElement('div');
                applianceElem.className = 'room-appliance';
                
                // 該当する家電のSVGを取得
                const originalAppliance = document.querySelector(`.appliance[data-name="${appliance.name}"]`);
                if (originalAppliance) {
                    const svgContent = originalAppliance.querySelector('svg').outerHTML;
                    applianceElem.innerHTML = `
                        <div class="remove-appliance" data-index="${index}" data-circuit="${circuit.id}">×</div>
                        ${svgContent}
                        <div class="appliance-name">${appliance.name}</div>
                    `;
                }
                
                roomContainer.appendChild(applianceElem);
            });
            
            // 削除ボタンにイベントを追加
            const removeButtons = roomContainer.querySelectorAll('.remove-appliance');
            removeButtons.forEach(button => {
                button.addEventListener('click', function() {
                    const index = parseInt(this.dataset.index);
                    const circuitId = parseInt(this.dataset.circuit);
                    removeAppliance(circuitId, index);
                });
            });
        }
        
        // 家電の削除
        function removeAppliance(circuitId, index) {
            const circuit = circuits.find(c => c.id === circuitId);
            if (circuit && circuit.appliances[index]) {
                circuit.appliances.splice(index, 1);
                
                // 回路負荷を再計算
                calculateCircuitLoad(circuit);
                
                // 回路表示を更新
                updateCircuitDisplay(circuit);
                
                // 部屋の家電を再表示
                renderRoomAppliances(circuit);
                
                // 総負荷を計算
                calculateTotalLoad();
                
                // ブレーカー状態を確認（遮断中なら復旧可能かチェック）
                if (!circuit.enabled) {
                    // 負荷が解消されていればブレーカーを復旧可能
                    if (circuit.amperes < circuit.capacity) {
                        circuit.enabled = true;
                        const breakerElem = document.querySelector(`.breaker[data-circuit="${circuit.id}"]`);
                        if (breakerElem) {
                            breakerElem.classList.remove('off');
                            breakerElem.classList.add('on');
                            
                            const rect = breakerElem.querySelector('rect');
                            if (rect) {
                                rect.setAttribute('fill', circuit.isELCB ? '#a855f7' : '#4ade80');
                            }
                        }
                    }
                }
                
                // 主幹ブレーカーが遮断中の場合、負荷状況によって復旧可能か確認
                if (!mainBreaker.enabled) {
                    checkMainBreakerRecovery();
                }
            }
        }
        
        // 回路表示更新
        function updateCircuitDisplay(circuit) {
            // ブレーカーの状態
            const breakerElem = document.querySelector(`.breaker[data-circuit="${circuit.id}"]`);
            if (breakerElem) {
                if (circuit.enabled) {
                    breakerElem.classList.remove('off');
                    breakerElem.classList.add('on');
                } else {
                    breakerElem.classList.remove('on');
                    breakerElem.classList.add('off');
                }
            }
            
            // 負荷表示
            const loadText = document.getElementById(`load-${circuit.id}`);
            if (loadText) {
                loadText.textContent = `${circuit.watts}W (${circuit.amperes.toFixed(1)}A)`;
            }
            
            // 部屋の回路状態表示を更新
            const circuitStatus = document.getElementById(`circuit-status-${circuit.id}`);
            if (circuitStatus) {
                circuitStatus.textContent = `${circuit.watts}W (${circuit.amperes.toFixed(1)}A)`;
            }
        }
        
        // 総負荷計算
        function calculateTotalLoad() {
            let rPhaseAmperes = 0;
            let tPhaseAmperes = 0;
            let rPhaseWatts = 0;
            let tPhaseWatts = 0;
            
            circuits.forEach(circuit => {
                if (circuit.enabled) {
                    if (circuit.phase === 'R') {
                        rPhaseAmperes += circuit.amperes;
                        rPhaseWatts += circuit.watts;
                    } else if (circuit.phase === 'T') {
                        tPhaseAmperes += circuit.amperes;
                        tPhaseWatts += circuit.watts;
                    } else if (circuit.phase === 'RT') {
                        // 200V機器は両相に均等に負荷がかかる
                        rPhaseAmperes += circuit.amperes / 2;
                        tPhaseAmperes += circuit.amperes / 2;
                        rPhaseWatts += circuit.watts / 2;
                        tPhaseWatts += circuit.watts / 2;
                    }
                }
            });
            
            // 総電流（相の大きい方）
            const totalAmperes = Math.max(rPhaseAmperes, tPhaseAmperes);
            
            // VA計算
            const rPhaseVa = rPhaseWatts * powerFactor;
            const tPhaseVa = tPhaseWatts * powerFactor;
            
            // 不平衡率計算
            let imbalanceRatio = 0;
            if (rPhaseAmperes > 0 || tPhaseAmperes > 0) {
                const maxPhaseA = Math.max(rPhaseAmperes, tPhaseAmperes);
                const minPhaseA = Math.min(rPhaseAmperes, tPhaseAmperes);
                imbalanceRatio = (maxPhaseA > 0) ? ((maxPhaseA - minPhaseA) / maxPhaseA) * 100 : 0;
            }
            
            // 推奨主幹サイズ
            const recommendedSize = Math.ceil(totalAmperes * safetyFactor / 10) * 10; // 10A単位で切り上げ
            
            // 表示更新
            document.getElementById('total-current').textContent = `${totalAmperes.toFixed(1)}A`;
            document.getElementById('r-phase-current').textContent = `${rPhaseAmperes.toFixed(1)}A`;
            document.getElementById('t-phase-current').textContent = `${tPhaseAmperes.toFixed(1)}A`;
            
            // 計算ロジック表示更新
            document.getElementById('r-phase-calculation').innerHTML = `R相: <span class="highlight-value">${rPhaseVa.toFixed(0)}VA</span> (${rPhaseWatts}W × ${powerFactor})`;
            document.getElementById('t-phase-calculation').innerHTML = `T相: <span class="highlight-value">${tPhaseVa.toFixed(0)}VA</span> (${tPhaseWatts}W × ${powerFactor})`;
            document.getElementById('imbalance-calculation').innerHTML = `現在の不平衡率: <span class="highlight-value">${imbalanceRatio.toFixed(1)}%</span>`;
            document.getElementById('recommended-size').innerHTML = `推奨主幹: <span class="highlight-value">${recommendedSize}A</span>`;
            
            // バー表示更新
            const mainCapacity = mainBreaker.capacity;
            const rPhasePercentage = (rPhaseAmperes / mainCapacity) * 100;
            const tPhasePercentage = (tPhaseAmperes / mainCapacity) * 100;
            const totalPercentage = (totalAmperes / mainCapacity) * 100;
            
            const currentBar = document.getElementById('current-bar');
            const rPhaseBar = document.getElementById('r-phase-bar');
            const tPhaseBar = document.getElementById('t-phase-bar');
            
            currentBar.style.width = `${Math.min(totalPercentage, 100)}%`;
            currentBar.setAttribute('data-value', `${Math.round(totalPercentage)}%`);
            
            rPhaseBar.style.width = `${Math.min(rPhasePercentage, 100)}%`;
            rPhaseBar.setAttribute('data-value', `${Math.round(rPhasePercentage)}%`);
            
            tPhaseBar.style.width = `${Math.min(tPhasePercentage, 100)}%`;
            tPhaseBar.setAttribute('data-value', `${Math.round(tPhasePercentage)}%`);
            
            // バーの警告色設定
            setBarWarningColor(currentBar, totalPercentage);
            setBarWarningColor(rPhaseBar, rPhasePercentage);
            setBarWarningColor(tPhaseBar, tPhasePercentage);
            
            // ステータスメッセージ更新
            updateStatusMessage(rPhaseAmperes, tPhaseAmperes, totalAmperes, imbalanceRatio);
            
            return { rPhaseAmperes, tPhaseAmperes, totalAmperes, imbalanceRatio };
        }
        
        // バーの警告色設定
        function setBarWarningColor(barElement, percentage) {
            if (percentage > 100) {
                barElement.classList.add('danger');
                barElement.classList.remove('warning');
            } else if (percentage > 80) {
                barElement.classList.add('warning');
                barElement.classList.remove('danger');
            } else {
                barElement.classList.remove('warning', 'danger');
            }
        }
        
        // ステータスメッセージ更新
        function updateStatusMessage(rPhaseAmperes, tPhaseAmperes, totalAmperes, imbalanceRatio) {
            const statusMessage = document.getElementById('status-message');
            const mainCapacity = mainBreaker.capacity;
            
            if (!mainBreaker.enabled) {
                statusMessage.textContent = '⚠️ 主幹ブレーカーが遮断されています';
                statusMessage.style.color = 'red';
                return;
            }
            
            // ブレーカー遮断チェック
            let trippedCircuits = circuits.filter(c => !c.enabled);
            if (trippedCircuits.length > 0) {
                let circuitNames = trippedCircuits.map(c => c.name).join('、');
                statusMessage.textContent = `⚠️ ${circuitNames}のブレーカーが遮断されています`;
                statusMessage.style.color = 'red';
                return;
            }
            
            // 相負荷の不均衡警告
            if (imbalanceRatio > 30) {
                statusMessage.textContent = '⚠️ R相とT相の負荷が不均衡です';
                statusMessage.style.color = 'orange';
                return;
            }
            
            // 負荷警告
            if (totalAmperes > mainCapacity * 0.8) {
                statusMessage.textContent = '⚠️ 総電流が主幹容量の80%を超えています';
                statusMessage.style.color = 'orange';
                return;
            }
            
            // 負荷警告（各相）
            if (rPhaseAmperes > mainCapacity * 0.8 || tPhaseAmperes > mainCapacity * 0.8) {
                const highPhase = rPhaseAmperes > tPhaseAmperes ? 'R相' : 'T相';
                statusMessage.textContent = `⚠️ ${highPhase}の電流が主幹容量の80%を超えています`;
                statusMessage.style.color = 'orange';
                return;
            }
            
            // 正常
            statusMessage.textContent = '正常に動作しています';
            statusMessage.style.color = 'green';
        }
        
        // ブレーカー遮断チェック
        function checkBreakerTrip() {
            // 各回路ブレーカーのチェック
            let hasTripped = false;
            
            circuits.forEach(circuit => {
                if (circuit.enabled && circuit.amperes > circuit.capacity) {
                    // ブレーカー遮断（遮断優先順位：分岐ブレーカー）
                    circuit.enabled = false;
                    
                    // SVG更新
                    const breakerElem = document.querySelector(`.breaker[data-circuit="${circuit.id}"]`);
                    if (breakerElem) {
                        breakerElem.classList.remove('on');
                        breakerElem.classList.add('off');
                    }
                    
                    // 専用回路の場合、トグルスイッチも更新
                    if (circuit.isDedicated) {
                        const toggle = document.querySelector(`.dedicated-toggle[data-circuit="${circuit.id}"]`);
                        const statusDisplay = toggle.parentElement.nextElementSibling;
                        
                        toggle.checked = false;
                        statusDisplay.textContent = "OFF";
                        statusDisplay.classList.remove('on');
                        statusDisplay.classList.add('off');
                        
                        // 負荷をリセット
                        circuit.watts = 0;
                        circuit.amperes = 0;
                    }
                    
                    hasTripped = true;
                    showAlert(`${circuit.name}回路のブレーカーが遮断されました。使用電流(${circuit.amperes.toFixed(1)}A)が容量(${circuit.capacity}A)を超えています。`);
                }
            });
            
            // 総負荷を再計算（ブレーカー遮断によって変化する）
            const { rPhaseAmperes, tPhaseAmperes, totalAmperes } = calculateTotalLoad();
            
            // 主幹ブレーカーの遮断チェック（分岐ブレーカー遮断後）
            if (mainBreaker.enabled) {
                // 単相の場合はどちらかの相が主幹容量を超えた場合に遮断
                if (rPhaseAmperes > mainBreaker.capacity || tPhaseAmperes > mainBreaker.capacity) {
                    tripMainBreaker();
                    const highPhase = rPhaseAmperes > tPhaseAmperes ? 'R相' : 'T相';
                    showAlert(`主幹ブレーカーが遮断されました。${highPhase}の使用電流(${Math.max(rPhaseAmperes, tPhaseAmperes).toFixed(1)}A)が主幹容量(${mainBreaker.capacity}A)を超えています。`);
                    return;
                }
                
                // 3相200Vの場合は合計が主幹容量の2倍を超えた場合に遮断
                if (rPhaseAmperes + tPhaseAmperes > mainBreaker.capacity * 2) {
                    tripMainBreaker();
                    showAlert(`主幹ブレーカーが遮断されました。総使用電流(${(rPhaseAmperes + tPhaseAmperes).toFixed(1)}A)が主幹容量の2倍(${mainBreaker.capacity * 2}A)を超えています。`);
                    return;
                }
            }
            
            if (hasTripped) {
                calculateTotalLoad(); // 負荷表示更新
            }
        }
        
        // 主幹ブレーカー遮断
        function tripMainBreaker() {
            mainBreaker.enabled = false;
            
            // SVG更新
            const mainBreakerElem = document.getElementById('main-breaker');
            mainBreakerElem.classList.remove('on');
            mainBreakerElem.classList.add('off');
            
            // すべての回路も停電状態になる（表示のみ、データは変更しない）
            circuits.forEach(circuit => {
                const breakerElem = document.querySelector(`.breaker[data-circuit="${circuit.id}"]`);
                if (breakerElem) {
                    breakerElem.classList.remove('on');
                    breakerElem.classList.add('off');
                }
                
                // 専用回路のトグルスイッチ更新
                if (circuit.isDedicated) {
                    const toggle = document.querySelector(`.dedicated-toggle[data-circuit="${circuit.id}"]`);
                    if (toggle && toggle.checked) {
                        const statusDisplay = toggle.parentElement.nextElementSibling;
                        
                        toggle.checked = false;
                        statusDisplay.textContent = "OFF";
                        statusDisplay.classList.remove('on');
                        statusDisplay.classList.add('off');
                        
                        // 負荷をリセット
                        circuit.watts = 0;
                        circuit.amperes = 0;
                    }
                }
            });
            
            // ステータスメッセージ更新
            calculateTotalLoad();
        }
        
        // 主幹ブレーカーの復旧確認
        function checkMainBreakerRecovery() {
            // 総負荷を計算（一時的にすべての回路が有効と仮定）
            let rPhaseAmperes = 0;
            let tPhaseAmperes = 0;
            
            circuits.forEach(circuit => {
                if (circuit.phase === 'R') {
                    rPhaseAmperes += circuit.amperes;
                } else if (circuit.phase === 'T') {
                    tPhaseAmperes += circuit.amperes;
                } else if (circuit.phase === 'RT') {
                    // 200V機器は両相に均等に負荷がかかる
                    rPhaseAmperes += circuit.amperes / 2;
                    tPhaseAmperes += circuit.amperes / 2;
                }
            });
            
            // どちらかの相で容量オーバーしていないか
            if (rPhaseAmperes <= mainBreaker.capacity && 
                tPhaseAmperes <= mainBreaker.capacity && 
                rPhaseAmperes + tPhaseAmperes <= mainBreaker.capacity * 2) {
                // 復旧可能
                mainBreaker.enabled = true;
                
                // SVG更新
                const mainBreakerElem = document.getElementById('main-breaker');
                mainBreakerElem.classList.remove('off');
                mainBreakerElem.classList.add('on');
                
                // 各回路ブレーカーも本来の状態に戻す
                circuits.forEach(circuit => {
                    const breakerElem = document.querySelector(`.breaker[data-circuit="${circuit.id}"]`);
                    if (breakerElem) {
                        if (circuit.enabled) {
                            breakerElem.classList.remove('off');
                            breakerElem.classList.add('on');
                            
                            const rect = breakerElem.querySelector('rect');
                            if (rect) {
                                rect.setAttribute('fill', circuit.isELCB ? '#a855f7' : '#4ade80');
                            }
                        }
                    }
                });
                
                // ステータスメッセージ更新
                calculateTotalLoad();
            }
        }
        
        // ブレーカークリックイベント設定
        function setupBreakerClickEvents() {
            // 分岐ブレーカー
            const circuitBreakers = document.querySelectorAll('.breaker[data-circuit]');
            circuitBreakers.forEach(breaker => {
                breaker.addEventListener('click', function() {
                    const circuitId = parseInt(this.dataset.circuit);
                    const circuit = circuits.find(c => c.id === circuitId);
                    
                    if (circuit) {
                        // 主幹が遮断中の場合は分岐を操作できない
                        if (!mainBreaker.enabled) {
                            showAlert('主幹ブレーカーが遮断されています。先に主幹ブレーカーを復旧してください。');
                            return;
                        }
                        
                        if (circuit.enabled) {
                            // ブレーカーをOFF
                            circuit.enabled = false;
                            this.classList.remove('on');
                            this.classList.add('off');
                            
                            // 専用回路の場合、トグルスイッチも更新
                            if (circuit.isDedicated) {
                                const toggle = document.querySelector(`.dedicated-toggle[data-circuit="${circuit.id}"]`);
                                const statusDisplay = toggle.parentElement.nextElementSibling;
                                
                                toggle.checked = false;
                                statusDisplay.textContent = "OFF";
                                statusDisplay.classList.remove('on');
                                statusDisplay.classList.add('off');
                                
                                // 負荷をリセット
                                circuit.watts = 0;
                                circuit.amperes = 0;
                            }
                        } else {
                            // ブレーカーをON（容量超過確認）
                            if (circuit.amperes > circuit.capacity) {
                                showAlert(`${circuit.name}回路の負荷(${circuit.amperes.toFixed(1)}A)が容量(${circuit.capacity}A)を超えているため、ブレーカーを入れることができません。`);
                                return;
                            }
                            
                            circuit.enabled = true;
                            this.classList.remove('off');
                            this.classList.add('on');
                            
                            const rect = this.querySelector('rect');
                            if (rect) {
                                rect.setAttribute('fill', circuit.isELCB ? '#a855f7' : '#4ade80');
                            }
                            
                            // 主幹ブレーカーの容量確認
                            const { rPhaseAmperes, tPhaseAmperes } = calculateTotalLoad();
                            
                            if (rPhaseAmperes > mainBreaker.capacity || 
                                tPhaseAmperes > mainBreaker.capacity || 
                                rPhaseAmperes + tPhaseAmperes > mainBreaker.capacity * 2) {
                                // 主幹遮断
                                tripMainBreaker();
                                showAlert('主幹ブレーカーが遮断されました。総使用電流が主幹容量を超えています。');
                            }
                        }
                        
                        // 総負荷計算と表示更新
                        calculateTotalLoad();
                    }
                });
            });
            
            // 主幹ブレーカー
            const mainBreakerElem = document.getElementById('main-breaker');
            mainBreakerElem.addEventListener('click', function() {
                if (mainBreaker.enabled) {
                    // 主幹をOFF
                    mainBreaker.enabled = false;
                    this.classList.remove('on');
                    this.classList.add('off');
                    
                    // すべての回路も停電状態になる（表示のみ、データは変更しない）
                    circuits.forEach(circuit => {
                        const breakerElem = document.querySelector(`.breaker[data-circuit="${circuit.id}"]`);
                        if (breakerElem) {
                            breakerElem.classList.remove('on');
                            breakerElem.classList.add('off');
                        }
                        
                        // 専用回路のトグルスイッチ更新
                        if (circuit.isDedicated) {
                            const toggle = document.querySelector(`.dedicated-toggle[data-circuit="${circuit.id}"]`);
                            if (toggle && toggle.checked) {
                                const statusDisplay = toggle.parentElement.nextElementSibling;
                                
                                toggle.checked = false;
                                statusDisplay.textContent = "OFF";
                                statusDisplay.classList.remove('on');
                                statusDisplay.classList.add('off');
                                
                                // 負荷をリセット
                                circuit.watts = 0;
                                circuit.amperes = 0;
                            }
                        }
                    });
                } else {
                    // 主幹をON（容量超過確認）
                    // 一時的に回路が有効と仮定して電流計算
                    let rPhaseAmperes = 0;
                    let tPhaseAmperes = 0;
                    
                    circuits.forEach(circuit => {
                        if (circuit.enabled) {
                            if (circuit.phase === 'R') {
                                rPhaseAmperes += circuit.amperes;
                            } else if (circuit.phase === 'T') {
                                tPhaseAmperes += circuit.amperes;
                            } else if (circuit.phase === 'RT') {
                                rPhaseAmperes += circuit.amperes / 2;
                                tPhaseAmperes += circuit.amperes / 2;
                            }
                        }
                    });
                    
                    if (rPhaseAmperes > mainBreaker.capacity || 
                        tPhaseAmperes > mainBreaker.capacity || 
                        rPhaseAmperes + tPhaseAmperes > mainBreaker.capacity * 2) {
                        showAlert('負荷が大きすぎるため、主幹ブレーカーを入れることができません。一部の機器を外してください。');
                        return;
                    }
                    
                    // 主幹ブレーカーを復旧
                    mainBreaker.enabled = true;
                    this.classList.remove('off');
                    this.classList.add('on');
                    
                    // 各回路ブレーカーも本来の状態に戻す
                    circuits.forEach(circuit => {
                        const breakerElem = document.querySelector(`.breaker[data-circuit="${circuit.id}"]`);
                        if (breakerElem) {
                            if (circuit.enabled) {
                                breakerElem.classList.remove('off');
                                breakerElem.classList.add('on');
                                
                                const rect = breakerElem.querySelector('rect');
                                if (rect) {
                                    rect.setAttribute('fill', circuit.isELCB ? '#a855f7' : '#4ade80');
                                }
                            }
                        }
                    });
                }
                
                // 表示更新
                calculateTotalLoad();
            });
        }
        
        // アラート表示
        function showAlert(message) {
            const alertModal = document.getElementById('alert-modal');
            const messageElem = document.getElementById('alert-message');
            
            messageElem.textContent = message;
            alertModal.style.display = 'flex';
        }
        
        // アラートを閉じる
        function closeModal() {
            document.getElementById('alert-modal').style.display = 'none';
        }
        
        // 漏電モーダルを閉じる
        function closeLeakageModal() {
            document.getElementById('leakage-modal').style.display = 'none';
        }
        
        // 使い方チュートリアルを表示
        function showTutorial() {
            document.getElementById('tutorial-modal').style.display = 'flex';
        }
        
        // 使い方チュートリアルを閉じる
        function closeTutorialModal() {
            document.getElementById('tutorial-modal').style.display = 'none';
        }
        
        // システムリセット（ブレーカーONに戻す）
        function resetSystem() {
            // 主幹ブレーカーリセット
            mainBreaker.enabled = true;
            const mainBreakerElem = document.getElementById('main-breaker');
            mainBreakerElem.classList.remove('off');
            mainBreakerElem.classList.add('on');
            
            // 各回路ブレーカーリセット
            circuits.forEach(circuit => {
                circuit.enabled = true;
                
                const breakerElem = document.querySelector(`.breaker[data-circuit="${circuit.id}"]`);
                if (breakerElem) {
                    breakerElem.classList.remove('off');
                    breakerElem.classList.add('on');
                    
                    const rect = breakerElem.querySelector('rect');
                    if (rect) {
                        rect.setAttribute('fill', circuit.isELCB ? '#a855f7' : '#4ade80');
                    }
                }
            });
            
            // 表示更新
            calculateTotalLoad();
        }
        
        // 全てリセット（家電も取り除く）
        function resetAll() {
            // 回路データリセット
            circuits.forEach(circuit => {
                circuit.appliances = [];
                circuit.amperes = 0;
                circuit.watts = 0;
                circuit.enabled = true;
                
                // 回路負荷表示更新
                const loadText = document.getElementById(`load-${circuit.id}`);
                if (loadText) {
                    loadText.textContent = '0W (0A)';
                }
                
                // 部屋の家電表示クリア
                const roomContainer = document.querySelector(`.room[data-room="${circuit.id}"] .room-appliances`);
                if (roomContainer) {
                    roomContainer.innerHTML = '';
                }
                
                // 部屋の回路状態表示を更新
                const circuitStatus = document.getElementById(`circuit-status-${circuit.id}`);
                if (circuitStatus) {
                    circuitStatus.textContent = '0W (0A)';
                }
                
                // ブレーカー状態リセット
                const breakerElem = document.querySelector(`.breaker[data-circuit="${circuit.id}"]`);
                if (breakerElem) {
                    breakerElem.classList.remove('off');
                    breakerElem.classList.add('on');
                    
                    const rect = breakerElem.querySelector('rect');
                    if (rect) {
                        rect.setAttribute('fill', circuit.isELCB ? '#a855f7' : '#4ade80');
                    }
                }
                
                // 専用回路のトグルスイッチリセット
                if (circuit.isDedicated) {
                    const toggle = document.querySelector(`.dedicated-toggle[data-circuit="${circuit.id}"]`);
                    if (toggle) {
                        const statusDisplay = toggle.parentElement.nextElementSibling;
                        
                        toggle.checked = false;
                        statusDisplay.textContent = "OFF";
                        statusDisplay.classList.remove('on');
                        statusDisplay.classList.add('off');
                    }
                }
            });
            
            // 主幹ブレーカーリセット
            mainBreaker.enabled = true;
            const mainBreakerElem = document.getElementById('main-breaker');
            mainBreakerElem.classList.remove('off');
            mainBreakerElem.classList.add('on');
            
            // 表示更新
            calculateTotalLoad();
        }
        
        // 漏電シミュレーション
        function triggerLeakage() {
            // 洗濯機回路（漏電ブレーカー）
            const elcbCircuit = circuits.find(c => c.isELCB);
            if (elcbCircuit && elcbCircuit.enabled) {
                // 漏電ブレーカーを遮断
                elcbCircuit.enabled = false;
                
                const breakerElem = document.querySelector(`.breaker[data-circuit="${elcbCircuit.id}"]`);
                if (breakerElem) {
                    breakerElem.classList.remove('on');
                    breakerElem.classList.add('off');
                }
                
                // 漏電モーダル表示
                document.getElementById('leakage-modal').style.display = 'flex';
                
                // 表示更新
                calculateTotalLoad();
            } else {
                showAlert('洗濯機の回路がOFFか、漏電ブレーカーがありません。');
            }
        }
