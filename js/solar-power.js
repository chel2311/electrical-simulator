        // DOM要素の取得
        const panelPowerInput = document.getElementById('panelPower');
        const panelEfficiencyInput = document.getElementById('panelEfficiency');
        const panelCountInput = document.getElementById('panelCount');
        const stringCountInput = document.getElementById('stringCount');
        const pcsCountInput = document.getElementById('pcsCount'); // パワコン台数入力
        const stringAssignmentPanel = document.getElementById('stringAssignmentPanel'); // ストリング割り当てパネル
        const stringAssignmentGrid = document.getElementById('stringAssignmentGrid'); // ストリング割り当てグリッド
        const useBoosterCheckbox = document.getElementById('useBooster');
        const boosterStringSelectionPanel = document.getElementById('boosterStringSelectionPanel'); // 追加：昇圧ストリング選択パネル
        const boosterStringSelection = document.getElementById('boosterStringSelection'); // 追加：昇圧ストリング選択コンテナ
        const weatherConditionSelect = document.getElementById('weatherCondition');
        const temperatureInput = document.getElementById('temperature');
        const temperatureValue = document.getElementById('temperatureValue');
        const tiltAngleInput = document.getElementById('tiltAngle');
        const tiltAngleValue = document.getElementById('tiltAngleValue');
        const orientationAngleInput = document.getElementById('orientationAngle');
        const orientationAngleValue = document.getElementById('orientationAngleValue');
        const calculateBtn = document.getElementById('calculateBtn');
        const stringConfigPanel = document.getElementById('stringConfigPanel');
        const panelGridContainer = document.getElementById('panelGridContainer');
        const powerConditionerContainer = document.getElementById('powerConditionerContainer'); // パワコンコンテナ
        const pcsTabs = document.getElementById('pcsTabs'); // パワコンタブ
        const pcsTabContents = document.getElementById('pcsTabContents'); // パワコンタブコンテンツ
        const applyCommonSettingsBtn = document.getElementById('applyCommonSettingsBtn'); // 共通設定適用ボタン
        const pcsComparisonContainer = document.getElementById('pcsComparisonContainer'); // パワコン比較表コンテナ
        const pcsComparisonBody = document.getElementById('pcsComparisonBody'); // パワコン比較表ボディ
        
        // 昇圧ユニット関連の要素
        const boosterUnitContainer = document.getElementById('boosterUnitContainer');
        const boosterInputVoltage = document.getElementById('boosterInputVoltage');
        const boosterOutputVoltage = document.getElementById('boosterOutputVoltage');
        const boosterEfficiencyValue = document.getElementById('boosterEfficiencyValue');
        
        // 昇圧回路図用の要素
        const circuitInputVoltage = document.getElementById('circuit-input-voltage');
        const circuitOutputVoltage = document.getElementById('circuit-output-voltage');
        
        // 接続箱関連の要素
        const junctionBoxContainer = document.getElementById('junctionBoxContainer');
        const junctionBoxStringCount = document.getElementById('junctionBoxStringCount');
        
        // 結果表示要素
        const systemCapacityEl = document.getElementById('systemCapacity');
        const modulesCountEl = document.getElementById('modulesCount');
        const stringsCountEl = document.getElementById('stringsCount');
        const powerConditionerCountEl = document.getElementById('powerConditionerCount'); // パワコン台数表示
        const instantPowerEl = document.getElementById('instantPower');
        const dailyGenerationEl = document.getElementById('dailyGeneration');
        const monthlyGenerationEl = document.getElementById('monthlyGeneration');
        const yearlyGenerationEl = document.getElementById('yearlyGeneration');
        const weatherFactorEl = document.getElementById('weatherFactor');
        const orientationFactorEl = document.getElementById('orientationFactor');
        const temperatureFactorEl = document.getElementById('temperatureFactor');
        const totalEfficiencyEl = document.getElementById('totalEfficiency');
        
        // チャート要素
        let monthlyChart = null;
        let lossChart = null;
        
        // パワコンタイプ定義
        const pcsTypes = [
            { id: 'standard', name: '標準型(ストリング型)', efficiency: 95.0, description: '最も一般的なタイプ。1つのMPPT回路で全ストリングを制御', color: '#3f51b5', minVoltage: 250 },
            { id: 'multi-string', name: 'マルチストリング型', efficiency: 97.0, description: '複数のMPPTを搭載(最大4系統)。異なる方位や傾斜のパネルに最適。接続箱不要', color: '#2196f3', minVoltage: 200 },
            { id: 'hybrid', name: 'ハイブリッド型', efficiency: 94.0, description: '太陽光と蓄電池の両方を管理できる統合型パワコン', color: '#009688', minVoltage: 220 },
            { id: 'micro', name: 'マイクロインバーター型', efficiency: 92.0, description: '各パネルに1つのインバーターを設置。パネル単位の最適化が可能', color: '#673ab7', minVoltage: 20 }
        ];
        
        // 設定オブジェクト
        let config = {
            // パネル設定
            panelCount: 12,
            panelPower: 330, // 1パネルあたりの定格出力(W)
            panelEfficiency: 19.5, // パネル変換効率(%)
            
            // ストリング設定
            stringCount: 3,
            panelsPerString: [],
            
            // 環境条件
            weatherCondition: '晴れ', // 天候
            temperature: 25, // 周囲温度(℃)
            tiltAngle: 30, // 傾斜角(°)
            orientationAngle: 0, // 方位角(°) 0=真南
            
            // パワーコンディショナー設定（配列に変更）
            pcsCount: 1, // パワコン台数
            pcsConfigs: [
                {
                    type: 'standard', // 標準型、マルチストリング型、ハイブリッド型など
                    ratedPower: 5.5, // パワコン定格出力(kW)
                    efficiency: 95.0, // パワコン変換効率(%)
                    mpptCount: 1, // MPPT回路数（マルチストリング型の場合）
                    userChangedEfficiency: false // ユーザーが効率値を変更したかどうか
                }
            ],
            stringToPcsMap: [], // ストリングとパワコンのマッピング
            useBooster: false, // 昇圧ユニット使用有無 - 初期値を無に
            autoBooster: false, // 昇圧ユニットの自動判定も無効に
            boosterStrings: [], // 昇圧対象のストリング配列（真偽値） - 新規追加
        };
        
        // 結果オブジェクト
        let results = {
            totalCapacity: 0, // システム容量(kW)
            instantPower: 0, // 瞬時発電電力(kW)
            dailyGeneration: 0, // 日間発電量(kWh)
            monthlyGeneration: 0, // 月間発電量(kWh)
            yearlyGeneration: 0, // 年間発電量(kWh)
            systemEfficiency: 0, // システム効率(%)
            totalEfficiency: 0, // 総合変換効率(%)
            losses: {}, // 各種損失内訳
            monthlyGenerations: [], // 月別発電量
            needsBooster: false, // 昇圧ユニットが必要かどうか
            stringVoltages: [], // 各ストリングの電圧
            boosterInputVoltage: [], // 昇圧ユニット入力電圧（ストリングごと）
            boosterOutputVoltage: [], // 昇圧ユニット出力電圧（ストリングごと）
            // パワコンごとの結果
            pcsResults: []
        };
        
        // タブクリックのイベントハンドラ
        function setupTabEvents() {
            // すべてのタブにイベントリスナーを追加
            document.querySelectorAll('.pcs-tab').forEach(tab => {
                tab.addEventListener('click', () => {
                    // タブのインデックスを取得
                    const pcsIndex = parseInt(tab.getAttribute('data-pcs-index'), 10);
                    
                    // すべてのタブを非アクティブにする
                    document.querySelectorAll('.pcs-tab').forEach(t => t.classList.remove('active'));
                    document.querySelectorAll('.pcs-tab-content').forEach(c => c.classList.remove('active'));
                    
                    // クリックされたタブとそれに対応するコンテンツをアクティブにする
                    tab.classList.add('active');
                    document.querySelector(`.pcs-tab-content[data-pcs-index="${pcsIndex}"]`).classList.add('active');
                });
            });
        }
        
        // パワコンタブを更新する関数
        function updatePcsTabs() {
            // パワコン台数を取得
            const pcsCount = parseInt(pcsCountInput.value, 10) || 1;
            
            // パワコン設定データの更新
            updatePcsConfigsArray(pcsCount);
            
            // タブの更新
            pcsTabs.innerHTML = '';
            pcsTabContents.innerHTML = '';
            
            // 各パワコンのタブとコンテンツを生成
            for (let i = 0; i < pcsCount; i++) {
                // タブの生成
                const tab = document.createElement('div');
                tab.className = `pcs-tab ${i === 0 ? 'active' : ''}`;
                tab.setAttribute('data-pcs-index', i);
                tab.textContent = `パワコン ${i + 1}`;
                pcsTabs.appendChild(tab);
                
                // コンテンツの生成
                const content = document.createElement('div');
                content.className = `pcs-tab-content ${i === 0 ? 'active' : ''}`;
                content.setAttribute('data-pcs-index', i);
                
                // パワコン設定を取得
                const pcsConfig = config.pcsConfigs[i] || {
                    type: 'standard',
                    ratedPower: 5.5,
                    efficiency: 95.0,
                    mpptCount: 1,
                    userChangedEfficiency: false
                };
                
                // パワコンタイプの説明を取得
                const pcsTypeObj = pcsTypes.find(type => type.id === pcsConfig.type);
                const pcsTypeDescription = pcsTypeObj ? pcsTypeObj.description : '最も一般的なタイプ。1つのMPPT回路で全ストリングを制御';
                
                // コンテンツの内容を設定
                content.innerHTML = `
                    <div class="form-group">
                        <label for="pcsType-${i}">パワコンタイプ: <span class="tooltip">ⓘ<span class="tooltiptext">パワーコンディショナーの種類によって特性が異なります</span></span></label>
                        <select id="pcsType-${i}" class="pcs-type-select" data-pcs-index="${i}">
                            <option value="standard" ${pcsConfig.type === 'standard' ? 'selected' : ''}>標準型(ストリング型)</option>
                            <option value="multi-string" ${pcsConfig.type === 'multi-string' ? 'selected' : ''}>マルチストリング型</option>
                            <option value="hybrid" ${pcsConfig.type === 'hybrid' ? 'selected' : ''}>ハイブリッド型</option>
                            <option value="micro" ${pcsConfig.type === 'micro' ? 'selected' : ''}>マイクロインバーター型</option>
                        </select>
                        <p id="pcsTypeDescription-${i}" class="pcs-type-description" style="margin: 0.5rem 0 0 0; font-size: 0.9rem; color: #666;">${pcsTypeDescription}</p>
                    </div>
                    
                    <div class="form-group">
                        <label for="pcsRatedPower-${i}">定格出力 (kW): <span class="tooltip">ⓘ<span class="tooltiptext">パワコンが出力できる最大電力</span></span></label>
                        <input type="number" id="pcsRatedPower-${i}" class="pcs-rated-power" data-pcs-index="${i}" min="1" max="50" step="0.1" value="${pcsConfig.ratedPower}">
                    </div>
                    
                    <div class="form-group">
                        <label for="pcsEfficiency-${i}">変換効率 (%): <span class="tooltip">ⓘ<span class="tooltiptext">DCからACへの変換効率</span></span></label>
                        <input type="number" id="pcsEfficiency-${i}" class="pcs-efficiency" data-pcs-index="${i}" min="80" max="99" step="0.1" value="${pcsConfig.efficiency}">
                    </div>
                    
                    <div id="mpptCountContainer-${i}" class="mppt-count-container form-group" style="display: ${pcsConfig.type === 'multi-string' ? 'block' : 'none'};">
                        <label for="mpptCount-${i}">MPPT回路数: <span class="tooltip">ⓘ<span class="tooltiptext">Maximum Power Point Tracking回路の数。各ストリングを個別に最適制御できます。1台あたり最大4系統まで接続可能</span></span></label>
                        <input type="number" id="mpptCount-${i}" class="mppt-count" data-pcs-index="${i}" min="1" max="4" value="${pcsConfig.mpptCount}">
                        <p style="margin: 0.5rem 0 0 0; font-size: 0.9rem; color: #666;">※ MPPT回路数はストリング数以下である必要があります。</p>
                    </div>
                `;
                
                pcsTabContents.appendChild(content);
            }
            
            // 共通設定ボタンの表示/非表示
            applyCommonSettingsBtn.style.display = pcsCount > 1 ? 'block' : 'none';
            
            // タブイベントの設定
            setupTabEvents();
            
            // 各パワコン設定の変更イベントを設定
            setupPcsConfigEvents();
        }
        
        // パワコン設定の配列を更新する関数
        function updatePcsConfigsArray(pcsCount) {
            // 現在のパワコン設定を保持
            const currentConfigs = [...config.pcsConfigs];
            
            // パワコン台数が増えた場合は設定を追加
            if (pcsCount > currentConfigs.length) {
                for (let i = currentConfigs.length; i < pcsCount; i++) {
                    // デフォルト設定（最初のパワコンの設定をコピー）
                    const defaultConfig = { ...currentConfigs[0] };
                    currentConfigs.push(defaultConfig);
                }
            }
            // パワコン台数が減った場合は設定を削除
            else if (pcsCount < currentConfigs.length) {
                currentConfigs.splice(pcsCount);
            }
            
            // 更新された設定を保存
            config.pcsConfigs = currentConfigs;
        }
        
        // パワコン設定の変更イベントをセットアップする関数
        function setupPcsConfigEvents() {
            // パワコンタイプの変更イベント
            document.querySelectorAll('.pcs-type-select').forEach(select => {
                select.addEventListener('change', function() {
                    const pcsIndex = parseInt(this.getAttribute('data-pcs-index'), 10);
                    const selectedType = this.value;
                    const pcsTypeObj = pcsTypes.find(type => type.id === selectedType);
                    
                    if (pcsTypeObj) {
                        // タイプ説明の更新
                        const descEl = document.getElementById(`pcsTypeDescription-${pcsIndex}`);
                        if (descEl) descEl.textContent = pcsTypeObj.description;
                        
                        // MPPT回路数の表示/非表示
                        const mpptContainer = document.getElementById(`mpptCountContainer-${pcsIndex}`);
                        if (mpptContainer) {
                            mpptContainer.style.display = selectedType === 'multi-string' ? 'block' : 'none';
                        }
                        
                        // MPPT回路数の更新
                        const mpptInput = document.getElementById(`mpptCount-${pcsIndex}`);
                        if (mpptInput && selectedType === 'multi-string') {
                            const stringCount = parseInt(stringCountInput.value, 10) || 1;
                            mpptInput.max = Math.min(stringCount, 4); // 最大値を4に変更
                            mpptInput.value = Math.min(3, stringCount);
                            config.pcsConfigs[pcsIndex].mpptCount = Math.min(3, stringCount);
                        } else {
                            config.pcsConfigs[pcsIndex].mpptCount = 1;
                        }
                        
                        // ユーザーが効率値を変更していない場合は、デフォルト値を設定
                        if (!config.pcsConfigs[pcsIndex].userChangedEfficiency) {
                            const effInput = document.getElementById(`pcsEfficiency-${pcsIndex}`);
                            if (effInput) {
                                effInput.value = pcsTypeObj.efficiency;
                                config.pcsConfigs[pcsIndex].efficiency = pcsTypeObj.efficiency;
                            }
                        }
                        
                        // 設定の更新
                        config.pcsConfigs[pcsIndex].type = selectedType;
                        
  // マイクロインバーター型の場合は昇圧ユニットを無効化
                        if (selectedType === 'micro') {
                            // 他のパワコンでマイクロインバーター型以外があるかチェック
                            const hasMixedTypes = config.pcsConfigs.some(cfg => cfg.type !== 'micro');
                            
                            if (!hasMixedTypes) {
                                useBoosterCheckbox.checked = false;
                                useBoosterCheckbox.disabled = true;
                                config.useBooster = false;
                            }
                        } else {
                            useBoosterCheckbox.disabled = false;
                        }
                        
                        // ストリング割り当ての更新
                        updateStringAssignmentPanel();
                        
                        // パワコン表示の更新
                        updatePcsVisualization();
                    }
                });
            });
            
            // パワコン定格出力の変更イベント
            document.querySelectorAll('.pcs-rated-power').forEach(input => {
                input.addEventListener('change', function() {
                    const pcsIndex = parseInt(this.getAttribute('data-pcs-index'), 10);
                    config.pcsConfigs[pcsIndex].ratedPower = parseFloat(this.value) || 5.5;
                    
                    // パワコン表示の更新
                    updatePcsVisualization();
                });
            });
            
            // パワコン効率の変更イベント
            document.querySelectorAll('.pcs-efficiency').forEach(input => {
                input.addEventListener('input', function() {
                    const pcsIndex = parseInt(this.getAttribute('data-pcs-index'), 10);
                    config.pcsConfigs[pcsIndex].efficiency = parseFloat(this.value) || 95.0;
                    config.pcsConfigs[pcsIndex].userChangedEfficiency = true;
                    
                    // パワコン表示の更新
                    updatePcsVisualization();
                });
            });
            
            // MPPT回路数の変更イベント
            document.querySelectorAll('.mppt-count').forEach(input => {
                input.addEventListener('change', function() {
                    const pcsIndex = parseInt(this.getAttribute('data-pcs-index'), 10);
                    
                    // ストリング数を取得
                    const stringCount = parseInt(stringCountInput.value, 10) || 1;
                    
                    // このパワコンに割り当てられたストリング数を計算
                    const assignedStrings = config.stringToPcsMap.filter(pcs => pcs === pcsIndex).length;
                    
                    // MPPT回路数の制限（割り当てられたストリング数以下、最大4まで）
                    const mpptCount = parseInt(this.value, 10) || 1;
                    const limitedMpptCount = Math.min(mpptCount, assignedStrings, 4);
                    
                    // 値を更新
                    config.pcsConfigs[pcsIndex].mpptCount = limitedMpptCount;
                    this.value = limitedMpptCount;
                    
                    // パワコン表示の更新
                    updatePcsVisualization();
                });
            });
        }
        
        // 共通設定適用ボタンのイベントリスナー
        applyCommonSettingsBtn.addEventListener('click', () => {
            // 最初のパワコンの設定を取得
            const firstConfig = config.pcsConfigs[0];
            
            // すべてのパワコンに適用
            for (let i = 1; i < config.pcsConfigs.length; i++) {
                config.pcsConfigs[i] = { ...firstConfig };
            }
            
            // UI更新
            updatePcsTabs();
            updatePcsVisualization();
            
            // 通知
            alert('すべてのパワコンに共通設定を適用しました。');
        });
        
        // UI要素のイベントリスナー
        // パワコンタイプが変更されたときの処理
        
        // パワコン台数が変更されたときの処理
        pcsCountInput.addEventListener('change', () => {
            config.pcsCount = parseInt(pcsCountInput.value, 10) || 1;
            
            // パワコンタブの更新
            updatePcsTabs();
            
            // ストリングの割り当てを更新
            updateStringToPcsMapping();
            
            // ストリング割り当てパネルの表示/非表示
            if (config.pcsCount > 1) {
                stringAssignmentPanel.style.display = 'block';
                updateStringAssignmentPanel();
            } else {
                stringAssignmentPanel.style.display = 'none';
            }
            
            // パワコン比較表の表示/非表示
            pcsComparisonContainer.style.display = config.pcsCount > 1 ? 'block' : 'none';
            
            // パワコン表示の更新
            updatePcsVisualization();
        });
        
        // ストリング数が変更されたときの処理
        stringCountInput.addEventListener('change', () => {
            config.stringCount = parseInt(stringCountInput.value, 10) || 1;
            
            // 昇圧対象ストリング配列のサイズを調整
            // 新しいストリングは自動的に昇圧対象とする
            if (config.boosterStrings.length < config.stringCount) {
                const additionalStrings = Array(config.stringCount - config.boosterStrings.length).fill(true);
                config.boosterStrings = [...config.boosterStrings, ...additionalStrings];
            } else if (config.boosterStrings.length > config.stringCount) {
                config.boosterStrings = config.boosterStrings.slice(0, config.stringCount);
            }
            
            // 昇圧ストリング選択パネルの更新
            if (config.useBooster) {
                updateBoosterStringSelection();
            }
            
            // マルチストリング型のパワコンがある場合の処理
            config.pcsConfigs.forEach((pcsConfig, pcsIndex) => {
                if (pcsConfig.type === 'multi-string') {
                    // このパワコンに割り当てられたストリング数を計算
                    const assignedStrings = config.stringToPcsMap.filter(pcs => pcs === pcsIndex).length;
                    
                    // MPPT回路数の上限を更新
                    const mpptInput = document.getElementById(`mpptCount-${pcsIndex}`);
                    if (mpptInput) {
                        mpptInput.max = Math.min(assignedStrings, 4); // 最大値を4に変更
                        
                        // 現在の値がストリング数を超えている場合は調整
                        if (parseInt(mpptInput.value, 10) > assignedStrings) {
                            mpptInput.value = assignedStrings;
                            pcsConfig.mpptCount = assignedStrings;
                        }
                    }
                    
                    // ストリング数が4を超える警告
                    if (assignedStrings > 4 && config.pcsCount === 1) {
                        alert(`マルチストリング型パワコン1台で接続できるのは最大4系統までです。ストリングを分散するためパワコンを${Math.ceil(config.stringCount / 4)}台に変更します。`);
                        config.pcsCount = Math.ceil(config.stringCount / 4);
                        pcsCountInput.value = config.pcsCount;
                        
                        // パワコンタブの更新
                        updatePcsTabs();
                        
                        // ストリング割り当てパネルの表示/非表示
                        if (config.pcsCount > 1) {
                            stringAssignmentPanel.style.display = 'block';
                        }
                    }
                }
            });
            
            updateStringConfig();
            
            // ストリングの割り当てを更新
            updateStringToPcsMapping();
            
            if (config.pcsCount > 1) {
                updateStringAssignmentPanel();
            }
            
            // 接続箱のストリング数表示を更新
            junctionBoxStringCount.textContent = config.stringCount;
            
            // ストリング数変更で昇圧ユニットの必要性を再評価
            checkBoosterNeed();
            
            // パワコン表示の更新
            updatePcsVisualization();
        });
        
        // パネル数が変更されたときの処理
        panelCountInput.addEventListener('change', () => {
            config.panelCount = parseInt(panelCountInput.value, 10) || 0;
            updateStringConfig();
            
            // パネル数変更で昇圧ユニットの必要性を再評価
            checkBoosterNeed();
            
            // システム容量に基づいて必要なパワコン数を推奨
            recommendPcsCount();
        });
        
        // パネル出力が変更されたときの処理
        panelPowerInput.addEventListener('change', () => {
            config.panelPower = parseInt(panelPowerInput.value, 10) || 0;
            
            // 昇圧ユニットの必要性を再評価
            checkBoosterNeed();
            
            // システム容量に基づいて必要なパワコン数を推奨
            recommendPcsCount();
        });
        
        // パネル効率が変更されたときの処理
        panelEfficiencyInput.addEventListener('change', () => {
            config.panelEfficiency = parseFloat(panelEfficiencyInput.value) || 0;
        });
        
        // 昇圧ユニットの設定が変更されたときの処理
        useBoosterCheckbox.addEventListener('change', () => {
            config.useBooster = useBoosterCheckbox.checked;
            // 手動で設定を変更した場合は自動判定をオフ
            config.autoBooster = false;
            
            // 昇圧ユニットの表示/非表示
            boosterUnitContainer.style.display = config.useBooster ? 'block' : 'none';
            
            // 昇圧ストリング選択パネルの表示/非表示
            boosterStringSelectionPanel.style.display = config.useBooster ? 'block' : 'none';
            
            if (config.useBooster) {
                // 初期化: パネル枚数が最小のストリングを自動選択
                if (!config.boosterStrings || config.boosterStrings.length !== config.stringCount) {
                    config.boosterStrings = Array(config.stringCount).fill(false);
                }
                
                // 全てのストリングを一旦未選択状態に
                config.boosterStrings.fill(false);
                
                // 最小容量のストリングを検索
                let minPanels = Infinity;
                let minStringIndex = 0;
                
                config.panelsPerString.forEach((count, index) => {
                    if (count < minPanels) {
                        minPanels = count;
                        minStringIndex = index;
                    }
                });
                
                // 最小容量のストリングを選択
                config.boosterStrings[minStringIndex] = true;
            }
            
            // 昇圧ストリング選択の更新
            updateBoosterStringSelection();
            
            // 使用中の昇圧ユニット情報を更新
            updateBoosterInfo();
        });
        
        // 昇圧ストリング選択パネルの更新
        function updateBoosterStringSelection() {
            boosterStringSelection.innerHTML = '';
            
            // 初期化: 必要に応じてboosterStrings配列を調整
            if (!config.boosterStrings || config.boosterStrings.length !== config.stringCount) {
                // デフォルトですべてのストリングを昇圧対象に
                config.boosterStrings = Array(config.stringCount).fill(true);
            }
            
            // 各ストリングの昇圧選択チェックボックスを生成
            for (let i = 0; i < config.stringCount; i++) {
                const stringDiv = document.createElement('div');
                stringDiv.className = 'string-config';
                stringDiv.style.padding = '5px';
                
                const checkboxId = `boostString${i}`;
                
                stringDiv.innerHTML = `
                    <div style="display: flex; align-items: center;">
                        <input type="checkbox" id="${checkboxId}" ${config.boosterStrings[i] ? 'checked' : ''} 
                            data-string-index="${i}" class="boost-string-checkbox">
                        <label for="${checkboxId}" style="margin-left: 8px; font-weight: normal;">
                            ストリング ${i + 1} (${config.panelsPerString[i] || 0}枚, ${(config.panelsPerString[i] || 0) * 30}V)
                        </label>
                    </div>
                `;
                
                boosterStringSelection.appendChild(stringDiv);
            }
            
            // チェックボックスの変更イベントを設定
            document.querySelectorAll('.boost-string-checkbox').forEach(checkbox => {
                checkbox.addEventListener('change', function() {
                    const stringIndex = parseInt(this.getAttribute('data-string-index'), 10);
                    config.boosterStrings[stringIndex] = this.checked;
                    
                    // ビジュアルを更新
                    updateBoosterInfo();
                });
            });
        }
        
        // 天候条件が変更されたときの処理
        weatherConditionSelect.addEventListener('change', () => {
            config.weatherCondition = weatherConditionSelect.value;
        });
        
        // 温度設定が変更されたときの処理
        temperatureInput.addEventListener('input', () => {
            config.temperature = parseInt(temperatureInput.value, 10) || 25;
            temperatureValue.textContent = `${config.temperature}℃`;
        });
        
        // 傾斜角設定が変更されたときの処理
        tiltAngleInput.addEventListener('input', () => {
            config.tiltAngle = parseInt(tiltAngleInput.value, 10) || 30;
            tiltAngleValue.textContent = `${config.tiltAngle}°`;
        });
        
        // 方位角設定が変更されたときの処理
        orientationAngleInput.addEventListener('input', () => {
            config.orientationAngle = parseInt(orientationAngleInput.value, 10) || 0;
            
            let orientationText = `${config.orientationAngle}°`;
            if (config.orientationAngle === 0) {
                orientationText += ' (真南)';
            } else if (config.orientationAngle < 0) {
                orientationText += ` (東${Math.abs(config.orientationAngle)}°)`;
            } else {
                orientationText += ` (西${config.orientationAngle}°)`;
            }
            
            orientationAngleValue.textContent = orientationText;
        });
        
        // システム容量に基づいてパワコン台数を推奨する関数
        function recommendPcsCount() {
            const totalCapacity = (config.panelCount * config.panelPower) / 1000;
            
            // 各パワコンの定格出力からシステム全体をカバーできるか確認
            const totalPcsCapacity = config.pcsConfigs.reduce((sum, pcsConfig) => sum + pcsConfig.ratedPower, 0);
            
            // 10%マージンを考慮
            if (totalCapacity > totalPcsCapacity * 1.1) {
                // 1台あたりの平均定格出力を計算
                const avgRatedPower = totalPcsCapacity / config.pcsCount;
                
                // 推奨台数の計算
                const recommendedCount = Math.ceil(totalCapacity / (avgRatedPower * 1.1));
                
                if (recommendedCount > config.pcsCount) {
                    const confirmChange = confirm(`システム容量 ${totalCapacity.toFixed(2)}kW に対して、現在のパワコン設定 (平均${avgRatedPower.toFixed(2)}kW) では ${recommendedCount} 台の設置が推奨されます。\n\nパワコン台数を ${recommendedCount} 台に変更しますか？`);
                    
                    if (confirmChange) {
                        config.pcsCount = recommendedCount;
                        pcsCountInput.value = recommendedCount;
                        
                        // パワコンタブの更新
                        updatePcsTabs();
                        
                        // ストリングの割り当てを更新
                        updateStringToPcsMapping();
                        
                        // ストリング割り当てパネルの表示/非表示
                        if (config.pcsCount > 1) {
                            stringAssignmentPanel.style.display = 'block';
                            updateStringAssignmentPanel();
                        } else {
                            stringAssignmentPanel.style.display = 'none';
                        }
                        
                        // パワコン比較表の表示/非表示
                        pcsComparisonContainer.style.display = config.pcsCount > 1 ? 'block' : 'none';
                        
                        // パワコン表示の更新
                        updatePcsVisualization();
                    }
                }
            }
        }
        
        // ストリングのパワコン割り当てを更新する関数
        function updateStringToPcsMapping() {
            const stringCount = config.stringCount;
            const pcsCount = config.pcsCount;
            
            // ストリングが均等になるように分配
            if (pcsCount > 0) {
                config.stringToPcsMap = Array(stringCount).fill(0).map((_, i) => Math.min(Math.floor(i / Math.ceil(stringCount / pcsCount)), pcsCount - 1));
            } else {
                config.stringToPcsMap = Array(stringCount).fill(0);
            }
        }
        
        // ストリング割り当てパネルを更新する関数
        function updateStringAssignmentPanel() {
            stringAssignmentGrid.innerHTML = '';
            
            for (let i = 0; i < config.stringCount; i++) {
                const assignmentItem = document.createElement('div');
                assignmentItem.className = 'string-assignment-item';
                
                const selectHtml = `
                    <div>
                        <div class="pcs-detail-label">ストリング ${i + 1}</div>
                        <select id="stringAssign${i}" data-string-index="${i}" class="string-assign-select">
                            ${Array.from({length: config.pcsCount}, (_, j) => `
                                <option value="${j}" ${config.stringToPcsMap[i] === j ? 'selected' : ''}>パワコン ${j + 1} (${getPcsTypeDisplayName(config.pcsConfigs[j].type)})</option>
                            `).join('')}
                        </select>
                    </div>
                `;
                
                assignmentItem.innerHTML = selectHtml;
                stringAssignmentGrid.appendChild(assignmentItem);
            }
            
            // 選択イベントの登録
            document.querySelectorAll('.string-assign-select').forEach(select => {
                select.addEventListener('change', function() {
                    const stringIndex = parseInt(this.getAttribute('data-string-index'), 10);
                    const pcsIndex = parseInt(this.value, 10);
                    config.stringToPcsMap[stringIndex] = pcsIndex;
                    
                    // マルチストリング型パワコンのMPPT回路数の上限を更新
                    if (config.pcsConfigs[pcsIndex].type === 'multi-string') {
                        // このパワコンに割り当てられたストリング数を計算
                        const assignedStrings = config.stringToPcsMap.filter(pcs => pcs === pcsIndex).length;
                        
                        // MPPT回路数の上限を更新
                        const mpptInput = document.getElementById(`mpptCount-${pcsIndex}`);
                        if (mpptInput) {
                            mpptInput.max = Math.min(assignedStrings, 4); // 最大値を4に変更
                            
                            // 現在の値がストリング数を超えている場合は調整
                            if (parseInt(mpptInput.value, 10) > assignedStrings) {
                                mpptInput.value = assignedStrings;
                                config.pcsConfigs[pcsIndex].mpptCount = assignedStrings;
                            }
                        }
                    }
                    
                    // パワコン表示を更新
                    updatePcsVisualization();
                });
            });
        }
        
        // パワコン表示を更新する関数
        function updatePcsVisualization() {
            powerConditionerContainer.innerHTML = '';
            
            // 各パワコンの表示を生成
            for (let i = 0; i < config.pcsCount; i++) {
                // このパワコンに接続されたストリングを取得
                const connectedStrings = config.stringToPcsMap.map((pcs, idx) => pcs === i ? (idx + 1) : null).filter(s => s !== null);
                
                // このパワコンに接続されたパネル数を計算
                const connectedPanelCount = connectedStrings.reduce((sum, strIdx) => {
                    const stringIndex = strIdx - 1;
                    return sum + (config.panelsPerString[stringIndex] || 0);
                }, 0);
                
                // このパワコンの容量計算
                const pcsTotalCapacity = (connectedPanelCount * config.panelPower) / 1000;
                
                const pcsContainer = document.createElement('div');
                pcsContainer.className = 'pcs-container';
                
                const pcsConfig = config.pcsConfigs[i];
                const pcsTypeObj = pcsTypes.find(type => type.id === pcsConfig.type);
                const pcsColor = pcsTypeObj ? pcsTypeObj.color : '#3f51b5';
                
                // SVGのパワコン表示を生成
                pcsContainer.innerHTML = `
                    <div class="pcs-header">
                        <h3 class="pcs-title">パワーコンディショナー ${i + 1}</h3>
                        <div class="pcs-info">接続ストリング: ${connectedStrings.join(', ') || 'なし'}</div>
                    </div>
                    
                    <div class="diagram-container">
                        <div class="component">
                            <div class="component-label">${getPcsTypeDisplayName(pcsConfig.type)} (${pcsConfig.ratedPower}kW)</div>
                            <svg id="powerConditionerSvg${i}" class="component-svg" width="320" height="180" viewBox="0 0 160 90" xmlns="http://www.w3.org/2000/svg">
                                <style>
                                    .pcs-body { fill: #e0e0e0; stroke: #b0b0b0; stroke-width: 0.8; }
                                    .pcs-front-panel { fill: #f0f0f0; stroke: #c0c0c0; stroke-width: 0.4; }
                                    .pcs-display-screen { fill: ${pcsColor}; rx:1; ry:1; }
                                    .pcs-display-text-main { font-family: 'Segoe UI', Arial, sans-serif; font-size: 5px; fill: #e8eaf6; text-anchor: middle; }
                                    .pcs-display-text-sub { font-family: 'Segoe UI', Arial, sans-serif; font-size: 3.5px; fill: #c5cae9; text-anchor: middle; }
                                    .pcs-indicator-label { font-family: 'Segoe UI', Arial, sans-serif; font-size: 2.5px; fill: #424242; text-anchor: middle; }
                                    .indicator-on { fill: #66bb6a; }
                                    .indicator-warn { fill: #ffa726; }
                                    .indicator-error { fill: #ef5350; }
                                    .pcs-button { fill: #cfd8dc; stroke: #90a4ae; stroke-width: 0.3; rx:1; ry:1; cursor: pointer; }
                                    .pcs-button:hover { fill: #b0bec5; }
                                    .pcs-button-text { font-family: 'Segoe UI', Arial, sans-serif; font-size: 3px; fill: #263238; text-anchor: middle; dominant-baseline: central; pointer-events: none;}
                                    .pcs-vent-slot { fill: #bdbdbd; }
                                    .pcs-logo { font-family: 'Arial Black', Gadget, sans-serif; font-size: 6px; fill: #757575; text-anchor: start;}
                                </style>
                            
                                <rect class="pcs-body" x="5" y="5" width="150" height="80" rx="4" ry="4" />
                                <text class="pcs-logo" x="12" y="15">PCS</text>
                                <rect class="pcs-front-panel" x="10" y="20" width="140" height="60" rx="2" ry="2" />
                            
                                <g id="display-unit" transform="translate(18, 25)">
                                    <rect class="pcs-display-screen" x="0" y="0" width="55" height="28" />
                                    <text id="pcs-display-power${i}" class="pcs-display-text-main" x="27.5" y="11">${pcsTotalCapacity.toFixed(2)}kW</text>
                                    <text id="pcs-display-efficiency${i}" class="pcs-display-text-sub" x="27.5" y="19">効率: ${pcsConfig.efficiency.toFixed(1)}%</text>
                                    <rect fill="#7986cb" x="5" y="22" width="7" height="2.5" rx="0.5"/>
                                    <rect fill="#5c6bc0" x="14" y="21.5" width="7" height="3" rx="0.5"/>
                                    <rect fill="#3f51b5" x="23" y="21" width="7" height="3.5" rx="0.5"/>
                                    <rect fill="#3949ab" x="32" y="21.5" width="7" height="3" rx="0.5"/>
                                    <rect fill="#303f9f" x="41" y="22" width="7" height="2.5" rx="0.5"/>
                                </g>
                            
                                <g id="controls-indicators" transform="translate(80, 25)">
                                    <g id="indicator-lights">
                                        <circle class="indicator-on" cx="10" cy="7" r="2.5" />
                                        <text class="pcs-indicator-label" x="10" y="12">運転</text>
                                        
                                        <circle class="indicator-warn" cx="22" cy="7" r="2.5" />
                                        <text class="pcs-indicator-label" x="22" y="12">警告</text>
                                        
                                        <circle class="indicator-error" cx="34" cy="7" r="2.5" />
                                        <text class="pcs-indicator-label" x="34" y="12">エラー</text>
                                    </g>
                                
                                    <g id="control-buttons" transform="translate(0, 20)">
                                        <rect class="pcs-button" x="0" y="0" width="12" height="6"/>
                                        <text class="pcs-button-text" x="6" y="3">MENU</text>
                                        
                                        <rect class="pcs-button" x="15" y="0" width="12" height="6"/>
                                        <text class="pcs-button-text" x="21" y="3">▲</text>
                                        
                                        <rect class="pcs-button" x="30" y="0" width="12" height="6"/>
                                        <text class="pcs-button-text" x="36" y="3">▼</text>
                                        
                                        <rect class="pcs-button" x="0" y="8" width="20" height="6"/>
                                        <text class="pcs-button-text" x="10" y="11">ENTER</text>
                                        
                                        <rect class="pcs-button" x="23" y="8" width="20" height="6"/>
                                        <text class="pcs-button-text" x="33" y="11">ESC</text>
                                    </g>
                                </g>
                            
                                <g id="top-vents">
                                    <rect class="pcs-vent-slot" x="15" y="7" width="130" height="1.2" rx="0.5"/>
                                    <rect class="pcs-vent-slot" x="15" y="9.2" width="130" height="1.2" rx="0.5"/>
                                </g>
                            
                                <g id="bottom-vents" transform="translate(0, 75)">
                                    <rect class="pcs-vent-slot" x="15" y="0" width="130" height="1.2" rx="0.5"/>
                                    <rect class="pcs-vent-slot" x="15" y="2.2" width="130" height="1.2" rx="0.5"/>
                                </g>
                            </svg>
                            <div class="efficiency-label">変換効率: ${pcsConfig.efficiency.toFixed(1)}%</div>
                        </div>
                    </div>
                    
                    <div class="pcs-details">
                        <div class="pcs-detail-item">
                            <div class="pcs-detail-label">容量</div>
                            <div class="pcs-detail-value">${pcsTotalCapacity.toFixed(2)} kW</div>
                        </div>
                        <div class="pcs-detail-item">
                            <div class="pcs-detail-label">接続モジュール</div>
                            <div class="pcs-detail-value">${connectedPanelCount} 枚</div>
                        </div>
                        <div class="pcs-detail-item">
                            <div class="pcs-detail-label">使用率</div>
                            <div class="pcs-detail-value">${Math.min(100, (pcsTotalCapacity / pcsConfig.ratedPower * 100)).toFixed(1)}%</div>
                        </div>
                        <div class="pcs-detail-item">
                            <div class="pcs-detail-label">出力電力</div>
                            <div class="pcs-detail-value" id="pcs${i}OutputPower">- kW</div>
                        </div>
                    </div>
                `;
                
                powerConditionerContainer.appendChild(pcsContainer);
            }
        }
        
        // パワコンタイプ名を表示用に変換する関数
        function getPcsTypeDisplayName(typeId) {
            const pcsTypeObj = pcsTypes.find(type => type.id === typeId);
            return pcsTypeObj ? pcsTypeObj.name : '標準型(ストリング型)';
        }
        
        // 昇圧ユニットの必要性を判断するロジック
        function checkBoosterNeed() {
            // 自動判定がオフの場合は何もしない
            if (!config.autoBooster) return;
            
            // 各ストリングの電圧を計算（1パネルあたり30Vと仮定）
            const stringVoltages = [];
            let minVoltage = Infinity;
            
            config.panelsPerString.forEach(panelCount => {
                const voltage = panelCount * 30; // 1パネルあたり30V
                stringVoltages.push(voltage);
                if (voltage < minVoltage) {
                    minVoltage = voltage;
                }
            });
            
            // 各パワコンタイプの最低入力電圧をチェック
            let needsBooster = false;
            
            config.pcsConfigs.forEach(pcsConfig => {
                const pcsTypeObj = pcsTypes.find(type => type.id === pcsConfig.type);
                const minRequiredVoltage = pcsTypeObj ? pcsTypeObj.minVoltage : 250;
                
                // 最低電圧が必要電圧を下回っている場合は昇圧ユニットが必要
                if (minVoltage < minRequiredVoltage) {
                    needsBooster = true;
                }
            });
            
            // 結果を保存
            results.needsBooster = needsBooster;
            results.stringVoltages = stringVoltages;
            
            // 昇圧ユニットが必要かつ自動判定がオンの場合は昇圧ユニットを使用
            if (needsBooster && config.autoBooster) {
                config.useBooster = true;
                useBoosterCheckbox.checked = true;
                
                // 昇圧ユニットのパラメータを計算
                if (stringVoltages.length > 0) {
                    let avgVoltage = stringVoltages.reduce((sum, voltage) => sum + voltage, 0) / stringVoltages.length;
                    results.boosterInputVoltage = Math.min(...stringVoltages);
                    results.boosterOutputVoltage = Math.max(250, avgVoltage * 1.5); // 最低でも250V、それより高ければ1.5倍程度に
                    // 値を丸める
                    results.boosterOutputVoltage = Math.round(results.boosterOutputVoltage / 10) * 10;
                    
                    // 昇圧ユニット情報の更新
                    updateBoosterInfo();
                }
                
                // 昇圧ユニットの表示
                boosterUnitContainer.style.display = 'block';
            } else if (!needsBooster && config.autoBooster) {
                config.useBooster = false;
                useBoosterCheckbox.checked = false;
                
                // 昇圧ユニットの非表示
                boosterUnitContainer.style.display = 'none';
            }
        }
        
        // 昇圧ユニット情報の更新
        function updateBoosterInfo() {
            if (config.useBooster) {
                boosterInputVoltage.textContent = `${results.boosterInputVoltage}V`;
                boosterOutputVoltage.textContent = `${results.boosterOutputVoltage}V`;
                boosterEfficiencyValue.textContent = '97.5%';
                
                // 昇圧回路図の電圧値も更新
                circuitInputVoltage.textContent = `${results.boosterInputVoltage}V`;
                circuitOutputVoltage.textContent = `${results.boosterOutputVoltage}V`;
            }
        }
        
        // ストリング構成の更新
        function updateStringConfig() {
            const panelCount = config.panelCount;
            const stringCount = config.stringCount;
            
            if (isNaN(stringCount) || isNaN(panelCount) || stringCount <= 0 || panelCount <= 0) {
                return;
            }
            
            // 均等分配の基本パネル数
            const basePerString = Math.floor(panelCount / stringCount);
            const remainder = panelCount % stringCount;
            
            // 各ストリングあたりのパネル数を配列で計算
            // 余りは最後のストリングに全て割り当てる
            config.panelsPerString = Array(stringCount).fill(basePerString);
            if (remainder > 0) {
                config.panelsPerString[stringCount - 1] += remainder;
            }
            
            // ストリング構成パネルの更新
            stringConfigPanel.innerHTML = '';
            
            config.panelsPerString.forEach((count, index) => {
                const stringDiv = document.createElement('div');
                stringDiv.className = 'string-config';
                
                const pcsIndex = config.stringToPcsMap[index] !== undefined ? config.stringToPcsMap[index] : 0;
                const pcsConfig = config.pcsConfigs[pcsIndex];
                
                let pcsSelectHtml = '';
                if (config.pcsCount > 1) {
                    pcsSelectHtml = `
                        <p>接続先: パワコン ${pcsIndex + 1} (${getPcsTypeDisplayName(pcsConfig.type)})</p>
                    `;
                }
                
                stringDiv.innerHTML = `
                    <h4>ストリング ${index + 1}</h4>
                    <p>パネル数: ${count} 枚</p>
                    <p>電圧: ${count * 30}V</p>
                    ${pcsSelectHtml}
                `;
                
                stringConfigPanel.appendChild(stringDiv);
            });
            
            // パネル配置の視覚化を更新
            renderPanelGrid();
            
            // 昇圧ユニットの必要性を判断
            checkBoosterNeed();
        }
        
        // パネル配置の視覚化
        function renderPanelGrid() {
            // パネル効率（環境要因を含む）を計算
            const orientationFactor = calculateOrientationFactor(config.tiltAngle, config.orientationAngle);
            const temperatureFactor = calculateTemperatureImpact(config.temperature);
            const panelEfficiency = orientationFactor * temperatureFactor * 100;
            
            // パネルグリッドコンテナをクリア
            panelGridContainer.innerHTML = '';
            
            // 各ストリングとパネルの生成
            config.panelsPerString.forEach((panelCount, stringIndex) => {
                const stringDiv = document.createElement('div');
                stringDiv.className = 'solar-panel-string';
                stringDiv.style.display = 'grid';
                stringDiv.style.gridTemplateColumns = `repeat(${panelCount}, 1fr)`;
                stringDiv.style.gap = '0.5rem';
                stringDiv.style.position = 'relative';
                
                // 接続先パワコンのラベル表示（複数パワコンの場合）
                if (config.stringToPcsMap[stringIndex] !== undefined) {
                    const pcsIndex = config.stringToPcsMap[stringIndex];
                    const pcsConfig = config.pcsConfigs[pcsIndex];
                    const pcsColor = pcsTypes.find(type => type.id === pcsConfig.type)?.color || '#3f51b5';
                    
                    const pcsLabel = document.createElement('div');
                    pcsLabel.className = 'pcs-connection-info';
                    pcsLabel.textContent = `→ PCS ${pcsIndex + 1} (${getPcsTypeDisplayName(pcsConfig.type)})`;
                    stringDiv.appendChild(pcsLabel);
                }
                
                // ストリング接続線
                const connectionDiv = document.createElement('div');
                connectionDiv.className = 'string-connection';
                stringDiv.appendChild(connectionDiv);
                
                // パネルの生成
                for (let i = 0; i < panelCount; i++) {
                    const panelContainer = document.createElement('div');
                    panelContainer.className = 'solar-panel-container';
                    
                    // パネルSVGの作成
                    const panelSvg = createSolarPanelSvg(panelEfficiency);
                    panelContainer.innerHTML = panelSvg;
                    
                    stringDiv.appendChild(panelContainer);
                }
                
                panelGridContainer.appendChild(stringDiv);
            });
        }
        
        // ソーラーパネルSVGの作成関数
        function createSolarPanelSvg(efficiency) {
            // 効率に応じた色の濃さを計算（効率が低いほど暗くなる）
            const efficiencyFactor = Math.max(0.5, efficiency / 100); // 最低50%の明るさを保持
            const baseColor = [0, 80, 158]; // #00509e (基本の青色)
            const adjustedColor = baseColor.map(channel => Math.round(channel * efficiencyFactor));
            const bgColor = `rgb(${adjustedColor[0]}, ${adjustedColor[1]}, ${adjustedColor[2]})`;
            
            // セルユニットの定義
            const cellUnit = `
                <g id="solar-cell-unit">
                    <rect class="cell-rect" x="0" y="0" width="15" height="15" rx="1" ry="1" fill="${bgColor}" stroke="#003366" stroke-width="0.5" />
                    <line class="busbar" x1="5" y1="0" x2="5" y2="15" stroke="#b0c4de" stroke-width="0.7" />
                    <line class="busbar" x1="10" y1="0" x2="10" y2="15" stroke="#b0c4de" stroke-width="0.7" />
                </g>
            `;
            
            // ソーラーパネルSVG
            return `
                <svg width="100%" height="100%" viewBox="0 0 200 120" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        ${cellUnit}
                    </defs>
                    
                    <rect class="module-frame" x="1.5" y="1.5" width="197" height="117" rx="3" ry="3" fill="none" stroke="#cccccc" stroke-width="3" />
                    <rect class="module-background" x="3" y="3" width="194" height="114" rx="2" ry="2" fill="#002244" />
                    
                    <!-- ソーラーセルのグリッド配置 -->
                    <g>
                        ${Array.from({ length: 6 }).map((_, rowIndex) => (
                            Array.from({ length: 10 }).map((_, colIndex) => `
                                <use href="#solar-cell-unit" x="${11.5 + colIndex * 18}" y="${7.5 + rowIndex * 18}" />
                            `).join('')
                        )).join('')}
                    </g>
                    
                    <!-- 効率表示ラベル -->
                    <g>
                        <rect x="50" y="50" width="100" height="20" fill="rgba(0,0,0,0.7)" rx="4" />
                        <text x="100" y="65" text-anchor="middle" fill="white" font-size="14" font-weight="bold">${efficiency.toFixed(1)}%</text>
                    </g>
                </svg>
            `;
        }
        
        // 計算ボタンのイベントリスナー
        calculateBtn.addEventListener('click', () => {
            // システム性能計算
            calculateSystemPerformance();
            
            // 結果の表示
            displayResults();
            
            // チャートの更新
            updateCharts();
            
            // パワコン比較の更新
            if (config.pcsCount > 1) {
                updatePcsComparison();
            }
        });
        
        // パワコン比較表を更新する関数
        function updatePcsComparison() {
            pcsComparisonBody.innerHTML = '';
            
            // 各パワコンの情報行を生成
            for (let i = 0; i < results.pcsResults.length; i++) {
                const pcsResult = results.pcsResults[i];
                const pcsConfig = config.pcsConfigs[i];
                
                // 接続ストリングの一覧を取得
                const connectedStrings = config.stringToPcsMap.map((pcs, idx) => pcs === i ? (idx + 1) : null).filter(s => s !== null);
                
                // 使用率の計算 (利用可能な容量に対する実際の出力の割合)
                const utilizationRate = pcsResult.capacity > 0 ? (pcsResult.instantPower / pcsResult.capacity) * 100 : 0;
                
                // 最適化提案の判定
                let optimizationBadge = '';
                if (utilizationRate < 70) {
                    optimizationBadge = '<span class="optimization-badge">容量見直し推奨</span>';
                } else if (utilizationRate > 95) {
                    optimizationBadge = '<span class="optimization-badge">クリッピングロス注意</span>';
                }
                
                // 行の作成
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>パワコン ${i + 1} ${optimizationBadge}</td>
                    <td>${getPcsTypeDisplayName(pcsConfig.type)}</td>
                    <td>${pcsConfig.ratedPower.toFixed(1)} kW</td>
                    <td>${pcsConfig.efficiency.toFixed(1)}%</td>
                    <td>${connectedStrings.join(', ') || 'なし'}</td>
                    <td>${pcsResult.dailyGeneration.toFixed(2)} kWh</td>
                    <td>${Math.min(100, (pcsResult.utilizationRate)).toFixed(1)}%</td>
                `;
                
                pcsComparisonBody.appendChild(row);
            }
            
            // 比較表の表示
            pcsComparisonContainer.style.display = 'block';
        }
        
        // システム性能計算関数
        function calculateSystemPerformance() {
            // 1. システム総容量計算(kW)
            const panelPower = parseFloat(config.panelPower) || 0;
            const panelCount = parseInt(config.panelCount, 10) || 0;
            const totalCapacity = (panelPower * panelCount) / 1000;
            
            // 2. 天候係数
            const weatherFactors = {
                '晴れ': 1.0,
                '薄曇り': 0.7,
                '曇り': 0.4,
                '雨': 0.2
            };
            const weatherFactor = weatherFactors[config.weatherCondition] || 0.7;
            
            // 3. 方位・傾斜角の影響
            const orientationFactor = calculateOrientationFactor(config.tiltAngle, config.orientationAngle);
            
            // 4. 温度の影響
            const temperatureFactor = calculateTemperatureImpact(config.temperature);
            
            // 5. パネル変換効率
            const panelEfficiency = parseFloat(config.panelEfficiency) / 100 || 0.195;
            
            // 6. その他のシステム損失
            const wiringLoss = 0.98; // 配線損失: 2%
            const mismatchLoss = 0.98; // モジュール間のミスマッチ損失: 2%
            const dustShadingLoss = 0.97; // 汚れや影による損失: 3%
            
            // 7. 昇圧ユニット効率
            const boosterEfficiency = 0.975;
            
            // 8. 日射強度（kW/m²）- 標準テスト条件は1kW/m²
            const solarIrradiance = 1.0 * weatherFactor;
            
            // 9. 1日あたりの平均日照時間（季節による変動を考慮）
            const avgDailySunHours = {
                "晴れ": 5.0,
                "薄曇り": 4.0,
                "曇り": 3.0,
                "雨": 1.5
            };
            const dailySunHours = avgDailySunHours[config.weatherCondition] || 4.0;
            
            // 10. パワコンごとの発電量計算
            let totalInstantPower = 0;
            let totalDailyGeneration = 0;
            let totalClippingLoss = 0;
            
            // パワコンごとの結果を初期化
            results.pcsResults = [];
            
            for (let i = 0; i < config.pcsCount; i++) {
                const pcsConfig = config.pcsConfigs[i];
                
                // このパワコンに接続されたストリングを取得
                const connectedStringIndices = config.stringToPcsMap.map((pcs, idx) => pcs === i ? idx : -1).filter(idx => idx !== -1);
                
                // このパワコンに接続されたパネル数を計算
                const connectedPanelCount = connectedStringIndices.reduce((sum, strIdx) => sum + config.panelsPerString[strIdx], 0);
                
                // このパワコンの容量計算
                const pcsTotalCapacity = (connectedPanelCount * panelPower) / 1000;
                
                // マルチストリング型の場合のストリング効率向上
                let stringEfficiencyBoost = 1.0;
                if (pcsConfig.type === 'multi-string') {
                    const mpptCount = parseInt(pcsConfig.mpptCount, 10) || 1;
                    // MPPTとストリングの比率に応じた効率向上
                    const assignedStrings = connectedStringIndices.length;
                    if (assignedStrings > 0) {
                        stringEfficiencyBoost = 1.0 + Math.min(mpptCount / assignedStrings, 1) * 0.05;
                    }
                }
                
                // パワコン効率
                const pcsEfficiency = parseFloat(pcsConfig.efficiency) / 100 || 0.945;
                
                // このパワコンのシステム効率計算
                const systemEfficiency = wiringLoss * mismatchLoss * dustShadingLoss * stringEfficiencyBoost;
                
                // ストリングごとの電力計算
                let pcsTheoreticalPower = 0;
                
                // ストリング毎に計算
                for (const strIdx of connectedStringIndices) {
                    // このストリングのパネル数と電圧
                    const stringPanelCount = config.panelsPerString[strIdx];
                    const stringVoltage = stringPanelCount * 30; // 1パネルあたり30V
                    
                    // 昇圧ユニットを使用する場合、昇圧効果を考慮
                    let thisStringBoosterEffect = 1.0;
                    if (config.useBooster && config.boosterStrings[strIdx]) {
                        thisStringBoosterEffect = boosterEfficiency;
                    }
                    
                    // ストリングの理論発電電力を計算
                    const stringPower = (stringPanelCount * panelPower / 1000) * solarIrradiance * orientationFactor
                                       * temperatureFactor * systemEfficiency * thisStringBoosterEffect;
                    
                    // パワコン全体の理論電力に加算
                    pcsTheoreticalPower += stringPower;
                }
                
                // パワコン定格上限でクリップ
                const pcsInstantPower = Math.min(pcsTheoreticalPower, parseFloat(pcsConfig.ratedPower) || 5.5) * pcsEfficiency;
                
                // クリッピングロス
                const pcsClippingLoss = Math.max(0, pcsTheoreticalPower - pcsInstantPower / pcsEfficiency);
                
                // 日間発電量
                const pcsDailyGeneration = pcsInstantPower * dailySunHours;
                
                // 合計に加算
                totalInstantPower += pcsInstantPower;
                totalDailyGeneration += pcsDailyGeneration;
                totalClippingLoss += pcsClippingLoss;
                
                // パワコンごとの結果を保存
                results.pcsResults.push({
                    capacity: pcsTotalCapacity,
                    connectedPanelCount,
                    instantPower: pcsInstantPower,
                    dailyGeneration: pcsDailyGeneration,
                    utilizationRate: pcsTotalCapacity > 0 ? (pcsInstantPower / pcsTotalCapacity) * 100 : 0,
                    clippingLoss: pcsClippingLoss,
                    systemEfficiency: systemEfficiency * 100,
                    pcsEfficiency: pcsEfficiency * 100
                });
                
                // パワコン出力表示を更新
                const outputPowerEl = document.getElementById(`pcs${i}OutputPower`);
                if (outputPowerEl) {
                    outputPowerEl.textContent = `${pcsInstantPower.toFixed(2)} kW`;
                }
            }
            
            // 月間発電量(kWh)
            const monthlyGeneration = totalDailyGeneration * 30; // 月30日と仮定
            
            // 年間月別発電量の推定（月ごとの日照時間と天候を考慮）
            const monthlyMultipliers = [
                0.7,  // 1月
                0.8,  // 2月
                0.9,  // 3月
                1.0,  // 4月
                1.05, // 5月
                0.9,  // 6月（梅雨）
                1.0,  // 7月
                1.0,  // 8月
                0.85, // 9月（秋雨）
                0.8,  // 10月
                0.7,  // 11月
                0.65  // 12月
            ];
            
            // 月別発電量の計算
            const monthlyGenerations = monthlyMultipliers.map(mult => monthlyGeneration * mult);
            const yearlyGeneration = monthlyGenerations.reduce((sum, val) => sum + val, 0);
            
            // システム全体の効率を計算（パワコンの平均値）
            const avgPcsEfficiency = results.pcsResults.reduce((sum, pcsResult) => sum + pcsResult.pcsEfficiency, 0) / results.pcsResults.length / 100;
            const avgSystemEfficiency = results.pcsResults.reduce((sum, pcsResult) => sum + pcsResult.systemEfficiency, 0) / results.pcsResults.length / 100;
            
            // 昇圧ユニット効率の計算（使用ストリングの割合に基づく）
            let avgBoosterEfficiency = 1.0;
            if (config.useBooster && config.boosterStrings.some(b => b)) {
                const boosterStringCount = config.boosterStrings.filter(b => b).length;
                avgBoosterEfficiency = 1.0 - (boosterStringCount / config.stringCount) * (1.0 - boosterEfficiency);
            }
            
            // 総合効率
            const totalEfficiency = orientationFactor * temperatureFactor * avgSystemEfficiency * avgPcsEfficiency * avgBoosterEfficiency;
            
            // 損失内訳の計算（クリッピングロスを含む）
            const theoreticalMax = totalCapacity * solarIrradiance;
            const clippingLossFactor = totalInstantPower > 0 ? totalClippingLoss / theoreticalMax : 0;
            
            // パワコン効率損失（平均値）
            const inverterLossFactor = 1 - avgPcsEfficiency;
            
            // 昇圧ユニット損失係数
            const boosterLossFactor = 1 - avgBoosterEfficiency;
            
            const lossFactors = {
                weather: 1 - weatherFactor,
                orientation: weatherFactor * (1 - orientationFactor),
                temperature: weatherFactor * orientationFactor * (1 - temperatureFactor),
                system: weatherFactor * orientationFactor * temperatureFactor * (1 - avgSystemEfficiency),
                inverter: weatherFactor * orientationFactor * temperatureFactor * avgSystemEfficiency * inverterLossFactor,
                booster: weatherFactor * orientationFactor * temperatureFactor * avgSystemEfficiency * avgPcsEfficiency * boosterLossFactor,
                clipping: clippingLossFactor
            };
            
            // 結果を更新
            results = {
                ...results,
                totalCapacity,
                instantPower: totalInstantPower,
                dailyGeneration: totalDailyGeneration,
                monthlyGeneration,
                yearlyGeneration,
                systemEfficiency: avgSystemEfficiency * 100,
                totalEfficiency: totalEfficiency * 100,
                losses: lossFactors,
                weatherFactor: weatherFactor * 100,
                orientationFactor: orientationFactor * 100,
                temperatureFactor: temperatureFactor * 100,
                boosterEfficiency: avgBoosterEfficiency * 100,
                monthlyGenerations,
                pcsResults: results.pcsResults
            };
        }
        
        // 方位・傾斜角の影響を計算
        function calculateOrientationFactor(tiltAngle, orientationAngle = 0) {
            const optimalTiltAngle = 30; // 日本における一般的な最適角度
            
            // 傾斜角の最適値からの乖離による効率低下
            let tiltEfficiency = 1.0 - Math.abs(tiltAngle - optimalTiltAngle) * 0.005;
            if (tiltEfficiency < 0.7) tiltEfficiency = 0.7; // 最低でも70%の効率は確保
            
            // 方位角の影響（0度=南向き、東西は効率が落ちる）
            let orientationEfficiency = 1.0 - Math.abs(orientationAngle) * 0.002;
            if (orientationEfficiency < 0.8) orientationEfficiency = 0.8; // 最低でも80%の効率は確保
            
            return tiltEfficiency * orientationEfficiency;
        }
        
        // 周囲温度の影響を計算
        function calculateTemperatureImpact(temperature) {
            const temperatureCoefficient = -0.004; // -0.4%/℃
            return 1 + temperatureCoefficient * (temperature - 25);
        }
        
        // 結果の表示
        function displayResults() {
            // システム情報の更新
            systemCapacityEl.textContent = `${results.totalCapacity.toFixed(2)} kW`;
            modulesCountEl.textContent = `${config.panelCount} 枚`;
            stringsCountEl.textContent = `${config.stringCount} 系統`;
            
            // パワコン台数表示
            powerConditionerCountEl.textContent = `${config.pcsCount} 台`;
            
            // 発電量予測の更新
            instantPowerEl.textContent = `${results.instantPower.toFixed(2)} kW`;
            dailyGenerationEl.textContent = `${results.dailyGeneration.toFixed(2)} kWh`;
            monthlyGenerationEl.textContent = `${results.monthlyGeneration.toFixed(2)} kWh`;
            yearlyGenerationEl.textContent = `${results.yearlyGeneration.toFixed(2)} kWh`;
            
            // 効率係数の更新
            weatherFactorEl.textContent = `${results.weatherFactor.toFixed(1)}%`;
            orientationFactorEl.textContent = `${results.orientationFactor.toFixed(1)}%`;
            temperatureFactorEl.textContent = `${results.temperatureFactor.toFixed(1)}%`;
            totalEfficiencyEl.textContent = `${results.totalEfficiency.toFixed(1)}%`;
            
            // パネル配置の更新
            renderPanelGrid();
            
            // パワコンタイプに応じた接続箱の表示/非表示
            let showJunctionBox = false;
            
            // 少なくとも1つのパワコンが標準型またはハイブリッド型の場合は接続箱を表示
            for (let i = 0; i < config.pcsCount; i++) {
                const pcsType = config.pcsConfigs[i].type;
                if (pcsType === 'standard' || pcsType === 'hybrid') {
                    showJunctionBox = true;
                    break;
                }
            }
            
            junctionBoxContainer.style.display = showJunctionBox ? 'block' : 'none';
            
            // 接続箱のストリング数表示を更新
            junctionBoxStringCount.textContent = config.stringCount;
            
            // パワコン表示の更新
            updatePcsVisualization();
            
            // 各パワコンの出力電力表示を更新
            results.pcsResults.forEach((pcsResult, index) => {
                const outputPowerEl = document.getElementById(`pcs${index}OutputPower`);
                if (outputPowerEl) {
                    outputPowerEl.textContent = `${pcsResult.instantPower.toFixed(2)} kW`;
                }
            });
            
            // 昇圧ユニットの自動判定
            if (config.autoBooster) {
                checkBoosterNeed();
            }
            
            // パワコン比較表の更新
            if (config.pcsCount > 1) {
                updatePcsComparison();
            }
        }
        
        // チャートの更新
        function updateCharts() {
            updateMonthlyChart();
            updateLossChart();
        }
        
        // 月別発電量チャートの更新
        function updateMonthlyChart() {
            const ctx = document.getElementById('monthlyChart').getContext('2d');
            
            if (monthlyChart) {
                monthlyChart.destroy();
            }
            
            const monthNames = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];
            
            monthlyChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: monthNames,
                    datasets: [{
                        label: '月間発電量 (kWh)',
                        data: results.monthlyGenerations,
                        backgroundColor: 'rgba(0, 91, 171, 0.7)',
                        borderColor: 'rgba(0, 91, 171, 1)',
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        y: {
                            beginAtZero: true,
                            title: {
                                display: true,
                                text: '発電量 (kWh)'
                            }
                        }
                    }
                }
            });
        }
        
        // 損失内訳チャートの更新
        function updateLossChart() {
            const ctx = document.getElementById('lossChart').getContext('2d');
            
            if (lossChart) {
                lossChart.destroy();
            }
            
            // 損失のラベルとカラー
            const lossLabels = {
                weather: '天候による損失',
                orientation: '方位・傾斜角による損失',
                temperature: '温度による損失',
                system: 'システム損失',
                inverter: 'パワコン変換損失',
                booster: '昇圧ユニット損失',
                clipping: 'クリッピング損失'
            };
            
            const lossColors = {
                weather: '#2196f3',
                orientation: '#ff9800',
                temperature: '#f44336',
                system: '#9c27b0',
                inverter: '#4caf50',
                booster: '#ff5722',
                clipping: '#795548'
            };
            
            // 全体の100%から差し引いた実際の出力率
            const totalLoss = Object.values(results.losses).reduce((sum, val) => sum + val, 0);
            const actualOutput = Math.max(0, 1 - totalLoss);
            
            // チャートデータ作成
            const labels = ['実発電量'];
            const data = [actualOutput];
            const backgroundColor = ['rgba(76, 175, 80, 0.7)'];
            const borderColor = ['rgba(76, 175, 80, 1)'];
            
            Object.entries(results.losses).forEach(([key, value]) => {
                if (value > 0.01) { // 1%以上の損失のみ表示
                    labels.push(lossLabels[key]);
                    data.push(value);
                    backgroundColor.push(lossColors[key]);
                    borderColor.push(lossColors[key]);
                }
            });
            
            lossChart = new Chart(ctx, {
                type: 'pie',
                data: {
                    labels: labels,
                    datasets: [{
                        data: data,
                        backgroundColor: backgroundColor,
                        borderColor: borderColor,
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    const label = context.label || '';
                                    const value = context.raw || 0;
                                    return `${label}: ${(value * 100).toFixed(1)}%`;
                                }
                            }
                        }
                    }
                }
            });
        }
        
        // 初期化関数
        function initialize() {
            // 設定項目の初期値を反映
            panelPowerInput.value = config.panelPower;
            panelEfficiencyInput.value = config.panelEfficiency;
            panelCountInput.value = config.panelCount;
            stringCountInput.value = config.stringCount;
            pcsCountInput.value = config.pcsCount;
            weatherConditionSelect.value = config.weatherCondition;
            temperatureInput.value = config.temperature;
            temperatureValue.textContent = `${config.temperature}℃`;
            tiltAngleInput.value = config.tiltAngle;
            tiltAngleValue.textContent = `${config.tiltAngle}°`;
            orientationAngleInput.value = config.orientationAngle;
            
            // 方位角の表示更新
            let orientationText = `${config.orientationAngle}°`;
            if (config.orientationAngle === 0) {
                orientationText += ' (真南)';
            } else if (config.orientationAngle < 0) {
                orientationText += ` (東${Math.abs(config.orientationAngle)}°)`;
            } else {
                orientationText += ` (西${config.orientationAngle}°)`;
            }
            orientationAngleValue.textContent = orientationText;
            
            // パワコンタブの初期化
            updatePcsTabs();
            
            // ストリングの初期割り当て設定
            updateStringToPcsMapping();
            
            // 複数パワコンの場合はストリング割り当てパネルを表示
            if (config.pcsCount > 1) {
                stringAssignmentPanel.style.display = 'block';
                updateStringAssignmentPanel();
                pcsComparisonContainer.style.display = 'block';
            } else {
                stringAssignmentPanel.style.display = 'none';
                pcsComparisonContainer.style.display = 'none';
            }
            
            // ストリング構成の更新
            updateStringConfig();
            
            // 昇圧ユニットの設定
            useBoosterCheckbox.checked = config.useBooster;
            
            // 昇圧ユニットの表示/非表示設定
            boosterUnitContainer.style.display = config.useBooster ? 'block' : 'none';
            boosterStringSelectionPanel.style.display = config.useBooster ? 'block' : 'none';
            
            // 昇圧ストリング選択の更新
            if (config.useBooster) {
                updateBoosterStringSelection();
            }
            
            // 接続箱のストリング数表示を更新
            junctionBoxStringCount.textContent = config.stringCount;
            
            // パワコン表示の更新
            updatePcsVisualization();
            
            // 結果の初期計算と表示
            calculateSystemPerformance();
            displayResults();
            updateCharts();
            
            // 共通設定ボタンの表示/非表示
            applyCommonSettingsBtn.style.display = config.pcsCount > 1 ? 'block' : 'none';
        }
        
        // 初期化を実行
        initialize();
        
        // タブ切り替え機能
        const tabButtons = document.querySelectorAll('.tab-button');
        const tabContents = document.querySelectorAll('.tab-content');
        
        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                // アクティブなタブを切り替え
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabContents.forEach(content => content.classList.remove('active'));
                
                // クリックされたタブをアクティブに
                button.classList.add('active');
                const tabId = button.getAttribute('data-tab');
                document.getElementById(`${tabId}-content`).classList.add('active');
            });
        });
        
        // カテゴリーアコーディオン機能
        const categoryHeaders = document.querySelectorAll('.category-header');
        
        categoryHeaders.forEach(header => {
            header.addEventListener('click', () => {
                const category = header.parentElement;
                category.classList.toggle('active');
            });
            
            // 初期状態で最初のカテゴリーを開く
            if (header === categoryHeaders[0]) {
                header.parentElement.classList.add('active');
            }
        });
        
        // 用語検索機能
        const searchInput = document.getElementById('termSearch');
        const termItems = document.querySelectorAll('.term-item');
        
        searchInput.addEventListener('input', () => {
            const searchText = searchInput.value.toLowerCase();
            
            termItems.forEach(item => {
                const termTitle = item.querySelector('h3').textContent.toLowerCase();
                const termContent = item.textContent.toLowerCase();
                
                if (termTitle.includes(searchText) || termContent.includes(searchText)) {
                    item.style.display = 'block';
                    // 検索にヒットしたカテゴリーを開く
                    const category = item.closest('.glossary-category');
                    category.classList.add('active');
                } else {
                    item.style.display = 'none';
                }
            });
            
            // 検索が空の場合は全て表示に戻す
            if (searchText === '') {
                termItems.forEach(item => {
                    item.style.display = 'block';
                });
            }
        });
