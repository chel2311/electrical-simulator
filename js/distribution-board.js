        // 回路データ
        let circuits = [];
        let config = {
            demandFactor: 0.4,
            powerFactor: 1.0,
            imbalanceLimit: 40,
            generationCapacity: 0,
            cableSafetyFactor: 0.8,
            simultaneityFactor: 0.7,  // 同時使用率
            fixedMainCapacity: 60,    // 強制的に設定する主幹容量（0=自動計算）
            minSpareCircuits: 2       // 最低余裕回路数
        };

        // ズーム状態
        let zoomLevel = 100;
        let panelHeight = 550;
        let detailsVisible = true;
        
        // CVTケーブル選定データ
        const cvtCables = [
            { size: '8sq', allowableCurrent: 42 },
            { size: '14sq', allowableCurrent: 61 },
            { size: '22sq', allowableCurrent: 82 },
            { size: '38sq', allowableCurrent: 110 },
            { size: '60sq', allowableCurrent: 142 },
            { size: '100sq', allowableCurrent: 195 },
            { size: '150sq', allowableCurrent: 250 },
            { size: '200sq', allowableCurrent: 287 }
        ];

        // ブレーカータイプごとのデフォルト設定
        const breakerDefaults = {
            '2P1E': { current: 20, voltage: 100, load: 1500, color: '#5cb85c', spaces: 1 },
            '2P2E': { current: 20, voltage: 200, load: 3000, color: '#5cb85c', spaces: 1 },
            '漏電': { current: 30, voltage: 100, load: 1500, color: '#9c27b0', spaces: 2 },
            '感震': { current: 30, voltage: 100, load: 0, color: '#e91e63', spaces: 1 },
            '連系': { current: 30, voltage: 200, load: 0, color: '#2196f3', spaces: 2 },
            '空き': { current: 0, voltage: 0, load: 0, color: '#f0f0f0', spaces: 1 }
        };

        // Panasonic品番データベース
        const panasonicModels = {
            'BQR': {
                name: 'コスモパネル（ドア付）',
                baseUrl: 'https://www2.panasonic.biz/scvb/a2A/simpleSearch.G02?target_category_kaiso=/CGS000003/CGS300011/CGS300048/CGS300303&s_end_flg=&sort_value=&s_hinban_key=&START_CNT=1',
                models: {
                    '30-4': 'BQR8344',
                    '30-6': 'BQR8366',
                    '30-8': 'BQR8384',
                    '30-10': 'BQR83102',
                    '30-12': 'BQR83124',
                    '30-14': 'BQR83142',
                    '30-16': 'BQR83162',
                    '30-18': 'BQR83182',
                    '30-20': 'BQR83202',
                    '40-4': 'BQR8444',
                    '40-6': 'BQR8462',
                    '40-8': 'BQR8484',
                    '40-10': 'BQR84102',
                    '40-12': 'BQR84124',
                    '40-14': 'BQR84142',
                    '40-16': 'BQR84162',
                    '40-18': 'BQR84182',
                    '40-20': 'BQR84202',
                    '50-4': 'BQR8544',
                    '50-6': 'BQR8562',
                    '50-8': 'BQR8584',
                    '50-10': 'BQR85102',
                    '50-12': 'BQR85124',
                    '50-14': 'BQR85142',
                    '50-16': 'BQR85162',
                    '50-18': 'BQR85182',
                    '50-20': 'BQR85202',
                    '60-12': 'BQR86124',
                    '60-14': 'BQR86142',
                    '60-16': 'BQR86162',
                    '60-18': 'BQR86182',
                    '60-20': 'BQR86202',
                    '60-22': 'BQR86222',
                    '60-24': 'BQR86242',
                    '60-26': 'BQR86262',
                    '60-28': 'BQR86282',
                    '60-30': 'BQR86302',
                    '75-20': 'BQR87202',
                    '75-22': 'BQR87222',
                    '75-24': 'BQR87242',
                    '75-26': 'BQR87262',
                    '75-28': 'BQR87282',
                    '75-30': 'BQR87302',
                    '75-32': 'BQR87322',
                    '100-20': 'BQR810202',
                    '100-22': 'BQR810222',
                    '100-24': 'BQR810242',
                    '100-26': 'BQR810262',
                    '100-28': 'BQR810282',
                    '100-30': 'BQR810302',
                    '100-32': 'BQR810322',
                    '100-34': 'BQR810342',
                    '100-36': 'BQR810362',
                    '100-38': 'BQR810382',
                    '100-40': 'BQR810402'
                }
            },
            'BQWF': {
                name: 'スマートコスモ（スマート分電盤）',
                baseUrl: 'https://www2.panasonic.biz/scvb/a2A/simpleSearch.G02?target_category_kaiso=/CGS000003/CGS300011/CGS300048/CGS300303&s_end_flg=&sort_value=&s_hinban_key=&START_CNT=1',
                models: {
                    '50-12': 'BQWF85124',
                    '50-14': 'BQWF85144',
                    '50-16': 'BQWF85164',
                    '50-18': 'BQWF85184',
                    '60-12': 'BQWF86124',
                    '60-14': 'BQWF86144',
                    '60-16': 'BQWF86164',
                    '60-18': 'BQWF86184'
                }
            }
        };

        // プリセット設定（更新版）
        const presets = {
            apartment: {
                name: '集合住宅',
                circuits: [
                    { type: '2P1E', voltage: 100, load: 1000, name: 'リビング', current: 20 },
                    { type: '2P1E', voltage: 100, load: 1000, name: '居室1', current: 20 },
                    { type: '2P1E', voltage: 100, load: 1000, name: '居室2', current: 20 },
                    { type: '2P1E', voltage: 100, load: 1500, name: 'キッチン', current: 20 },
                    { type: '2P1E', voltage: 100, load: 500, name: '浴室', current: 20 },
                    { type: '2P1E', voltage: 100, load: 750, name: '玄関・廊下', current: 20 },
                    { type: '2P1E', voltage: 100, load: 800, name: '洗面所', current: 20 },
                    { type: '2P1E', voltage: 100, load: 750, name: '浴室', current: 20 },
                    { type: '2P1E', voltage: 100, load: 1500, name: '電子レンジ', current: 20 },
                    { type: '2P1E', voltage: 100, load: 1500, name: 'エアコン1', current: 20 },
                    { type: '2P1E', voltage: 100, load: 1500, name: 'エアコン2', current: 20 },
                    { type: '2P2E', voltage: 100, load: 1500, name: 'エアコン主', current: 20 }
                ]
            },
            house: {
                name: '戸建住宅',
                circuits: [
                    { type: '2P1E', voltage: 100, load: 1500, name: '玄関・廊下', current: 20 },
                    { type: '2P1E', voltage: 100, load: 1400, name: 'リビング', current: 20 },
                    { type: '2P1E', voltage: 100, load: 800, name: 'ダイニング', current: 20 },
                    { type: '2P1E', voltage: 100, load: 1500, name: 'キッチン', current: 20 },
                    { type: '2P1E', voltage: 100, load: 1000, name: '主寝室', current: 20 },
                    { type: '2P1E', voltage: 100, load: 800, name: '子供部屋1', current: 20 },
                    { type: '2P1E', voltage: 100, load: 800, name: '子供部屋2', current: 20 },
                    { type: '2P1E', voltage: 100, load: 1200, name: '洗面・浴室', current: 30 },
                    { type: '2P1E', voltage: 100, load: 500, name: '暖房便座', current: 20 },
                    { type: '2P1E', voltage: 100, load: 500, name: '階段・廊下', current: 20 },
                    { type: '2P1E', voltage: 100, load: 1500, name: '駐車場', current: 20 },
                    { type: '2P1E', voltage: 100, load: 1500, name: '洗濯機', current: 20 },
                    { type: '2P1E', voltage: 100, load: 1500, name: '食洗機', current: 30 },
                    { type: '2P1E', voltage: 100, load: 1200, name: '洗濯機', current: 30 },
                    { type: '2P1E', voltage: 100, load: 1500, name: '電子レンジ', current: 20 },
                    { type: '2P2E', voltage: 200, load: 4000, name: 'IHクッキングヒーター', current: 30 },
                    { type: '2P2E', voltage: 200, load: 3000, name: 'エコキュート', current: 20 },
                    { type: '2P2E', voltage: 200, load: 2500, name: 'ヒートポンプ床暖房', current: 20 },
                    { type: '2P2E', voltage: 200, load: 2500, name: 'エアコンリビング', current: 20 },
                    { type: '2P2E', voltage: 200, load: 3000, name: 'EV', current: 20 },
                    { type: '連系', voltage: 200, load: 0, name: '太陽光連系用', current: 30 },
                    { type: '感震', voltage: 100, load: 0, name: '感震ブレーカー', current: 30 }
                ],
                generationCapacity: 5000 // 太陽光発電容量を設定（5kW）
            },
            allElectric: {
                name: 'オール電化住宅',
                circuits: [
                    { type: '2P1E', voltage: 100, load: 1400, name: 'リビング', current: 20 },
                    { type: '2P1E', voltage: 100, load: 700, name: 'ダイニング', current: 20 },
                    { type: '2P1E', voltage: 100, load: 1500, name: 'キッチン', current: 20 },
                    { type: '2P1E', voltage: 100, load: 1000, name: '主寝室', current: 20 },
                    { type: '2P1E', voltage: 100, load: 800, name: '子供部屋1', current: 20 },
                    { type: '2P1E', voltage: 100, load: 800, name: '子供部屋2', current: 20 },
                    { type: '2P1E', voltage: 100, load: 1200, name: '洗濯機', current: 30 },
                    { type: '2P1E', voltage: 100, load: 500, name: '暖房便座', current: 20 },
                    { type: '2P1E', voltage: 100, load: 1000, name: '洗面所', current: 20 },
                    { type: '2P1E', voltage: 100, load: 1500, name: '玄関・廊下', current: 20 },
                    { type: '2P1E', voltage: 100, load: 1500, name: '階段・廊下', current: 20 },
                    { type: '2P1E', voltage: 100, load: 1500, name: '書斎', current: 20 },
                    { type: '2P1E', voltage: 100, load: 1500, name: '食洗機', current: 30 },
                    { type: '2P1E', voltage: 100, load: 1500, name: '電子レンジ', current: 20 },
                    { type: '2P1E', voltage: 100, load: 1500, name: '浴室乾燥機', current: 30 },
                    { type: '2P1E', voltage: 100, load: 1500, name: 'エアコン主寝室', current: 20 },
                    { type: '2P1E', voltage: 100, load: 1500, name: 'エアコン子供部屋1', current: 20 },
                    { type: '2P1E', voltage: 100, load: 1500, name: 'エアコン子供部屋2', current: 20 },
                    { type: '2P2E', voltage: 200, load: 4000, name: 'エコキュート', current: 20 },
                    { type: '2P2E', voltage: 200, load: 3000, name: 'エアコンLDK', current: 20 },
                    { type: '2P2E', voltage: 200, load: 4500, name: 'IHクッキングヒーター', current: 30 },
                    { type: '2P2E', voltage: 200, load: 3000, name: 'EV', current: 20 }
                ]
            },
            ecoHouse: {
                name: '省エネ住宅',
                circuits: [
                    { type: '2P1E', voltage: 100, load: 1500, name: 'リビング', current: 20 },
                    { type: '2P1E', voltage: 100, load: 750, name: 'ダイニング', current: 20 },
                    { type: '2P1E', voltage: 100, load: 1500, name: 'キッチン', current: 20 },
                    { type: '2P1E', voltage: 100, load: 1000, name: '洗面所・浴室', current: 20 },
                    { type: '2P1E', voltage: 100, load: 1500, name: '玄関・廊下', current: 20 },
                    { type: '2P1E', voltage: 100, load: 1500, name: '階段・廊下', current: 20 },
                    { type: '2P1E', voltage: 100, load: 1000, name: '主寝室', current: 20 },
                    { type: '2P1E', voltage: 100, load: 800, name: '子供部屋1', current: 20 },
                    { type: '2P1E', voltage: 100, load: 800, name: '子供部屋2', current: 20 },
                    { type: '2P1E', voltage: 100, load: 1500, name: 'エアコン主寝室', current: 20 },
                    { type: '2P1E', voltage: 100, load: 500, name: '暖房便座', current: 20 },
                    { type: '2P1E', voltage: 100, load: 1500, name: '浴室乾燥機', current: 30 },
                    { type: '2P1E', voltage: 100, load: 1500, name: '食洗機', current: 30 }
                ]
            }
        };

        // 初期化
        window.addEventListener('DOMContentLoaded', function() {
            // UIコントロールの初期化
            initUIControls();
            
            // 力率の設定を最初に確実に反映
            const powerFactorElement = document.getElementById('power-factor');
            if (powerFactorElement) {
                config.powerFactor = parseFloat(powerFactorElement.value);
            }
            
            // 需要率も同様に反映
            const demandFactorElement = document.getElementById('demand-factor');
            if (demandFactorElement) {
                config.demandFactor = parseFloat(demandFactorElement.value);
            }
            
            // 固定主幹容量の設定を反映
            const fixedMainElement = document.getElementById('fixed-main-capacity');
            if (fixedMainElement) {
                config.fixedMainCapacity = parseInt(fixedMainElement.value);
            }
            
            // 最低余裕回路数の設定を反映
            const minSpareElement = document.getElementById('min-spare-circuits');
            if (minSpareElement) {
                config.minSpareCircuits = parseInt(minSpareElement.value);
            }
            
            // 発電容量の変更イベントを登録
            document.getElementById('generation-capacity').addEventListener('change', function() {
                const newValue = parseInt(this.value) || 0;
                if (newValue !== config.generationCapacity) {
                    config.generationCapacity = newValue;
                    
                    // 発電容量が設定されたのに連系ブレーカーがない場合
                    if (newValue > 0 && !hasGridTieBreaker()) {
                        const addGridTie = confirm('発電容量を設定しました。連系ブレーカーを追加しますか？');
                        if (addGridTie) {
                            addGridTieBreaker();
                        }
                    }
                    
                    // 太陽光アイコンの表示制御
                    updateSolarIconVisibility();
                    
                    // 発電容量が0になったら、発電カードを削除
                    if (newValue === 0) {
                        removeGenerationCard();
                    }
                    
                    // 計算更新
                    calculateAll();
                }
            });
            
            // 初期回路を20個作成
            setCircuitCount(20);
            initializeSVG();
            renderCircuitTable();
            calculateAll();
            
            // 主幹ブレーカーのクリックイベント
            const mainBreaker = document.getElementById('main-breaker');
            mainBreaker.addEventListener('click', function() {
                toggleMainBreaker();
            });
            
            // 設定表示の更新
            updateConfigDisplay();
            
            // 連系ブレーカーと発電容量の連動を初期化
            updateGridTieIndicator();
            updateSolarIconVisibility();
        });

        // UIコントロールの初期化
        function initUIControls() {
            // ズームコントロール
            document.getElementById('zoom-in').addEventListener('click', function() {
                zoomLevel += 10;
                updateZoom();
            });
            
            document.getElementById('zoom-out').addEventListener('click', function() {
                if (zoomLevel > 50) {
                    zoomLevel -= 10;
                    updateZoom();
                }
            });
            
            document.getElementById('zoom-reset').addEventListener('click', function() {
                zoomLevel = 100;
                updateZoom();
            });
            
            // パネル拡大ボタン
            document.getElementById('panel-expand').addEventListener('click', function() {
                const button = document.getElementById('panel-expand');
                const svgContainer = document.querySelector('.svg-container');
                
                if (panelHeight === 550) {
                    panelHeight = 700;
                    svgContainer.style.height = '700px';
                    button.innerHTML = '<svg class="btn-icon" viewBox="0 0 24 24"><path d="M19 19h-6v-2h6v-6h2v6h6v2h-6v6h-2v-6zm-8-8h-6v-2h6V3h2v6h6v2h-6v6h-2v-6z"/></svg> 分電盤を縮小';
                } else {
                    panelHeight = 550;
                    svgContainer.style.height = '550px';
                    button.innerHTML = '<svg class="btn-icon" viewBox="0 0 24 24"><path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/></svg> 分電盤を拡大';
                }
            });
            
            // 詳細表示切替ボタン
            document.getElementById('collapse-details').addEventListener('click', function() {
                const details = document.getElementById('calculation-details');
                const button = document.getElementById('collapse-details');
                
                if (detailsVisible) {
                    details.style.display = 'none';
                    button.textContent = '詳細表示';
                    detailsVisible = false;
                } else {
                    details.style.display = 'block';
                    button.textContent = '詳細非表示';
                    detailsVisible = true;
                }
            });
            
            // 詳細表示拡張ボタン
            document.getElementById('expand-logic').addEventListener('click', function() {
                const expandedLogic = document.getElementById('expanded-logic');
                const button = document.getElementById('expand-logic');
                
                if (expandedLogic.style.display === 'none') {
                    expandedLogic.style.display = 'block';
                    button.textContent = '簡易表示';
                } else {
                    expandedLogic.style.display = 'none';
                    button.textContent = '詳細表示';
                }
            });
        }

        // ズーム更新
        function updateZoom() {
            document.getElementById('zoom-level').textContent = zoomLevel + '%';
            document.querySelector('.panel-svg').style.transform = `scale(${zoomLevel/100})`;
            document.querySelector('.panel-svg').style.transformOrigin = 'center center';
        }

        // SVGの初期化
        function initializeSVG() {
            renderAllBreakers();
        }

        // 太陽光アイコンの表示制御
        function updateSolarIconVisibility() {
            const solarIcon = document.getElementById('solar-icon');
            const hasGeneration = config.generationCapacity > 0;
            const hasGridTie = hasGridTieBreaker();
            
            if (hasGeneration && hasGridTie) {
                solarIcon.style.display = 'block';
            } else {
                solarIcon.style.display = 'none';
            }
        }

        // 連系ブレーカーのステータス表示更新
        function updateGridTieIndicator() {
            const indicator = document.getElementById('grid-tie-indicator');
            const input = document.getElementById('generation-capacity');
            
            if (hasGridTieBreaker()) {
                indicator.style.display = 'block';
                input.classList.add('generation-input-highlight');
            } else {
                indicator.style.display = 'none';
                input.classList.remove('generation-input-highlight');
            }
        }

        // 連系ブレーカーがあるかチェック
        function hasGridTieBreaker() {
            return circuits.some(c => c.breakerType === '連系');
        }

        // 連系ブレーカーを追加
        function addGridTieBreaker() {
            // 空きブレーカーを探す
            const emptyIndex = circuits.findIndex(c => c.breakerType === '空き');
            
            if (emptyIndex >= 0) {
                // 空きブレーカーを連系ブレーカーに変更
                updateCircuit(emptyIndex, 'breakerType', '連系');
                updateCircuit(emptyIndex, 'name', '太陽光連系用');
            } else {
                // 空きがなければ新しい回路を追加
                const newCircuitIndex = circuits.length;
                addDefaultCircuit(newCircuitIndex + 1);
                updateCircuit(newCircuitIndex, 'breakerType', '連系');
                updateCircuit(newCircuitIndex, 'name', '太陽光連系用');
            }
            
            updateGridTieIndicator();
            updateSolarIconVisibility();
        }

        // 発電カードの作成・更新
        function updateGenerationCard(actualTotalLoad) {
            // 発電容量が0の場合は表示しない
            if (config.generationCapacity === 0 || !hasGridTieBreaker()) {
                removeGenerationCard();
                return;
            }
            
            // 発電カードがまだない場合は作成
            if (!document.getElementById('generation-card')) {
                const statusCards = document.querySelector('.status-cards');
                
                const generationCard = document.createElement('div');
                generationCard.id = 'generation-card';
                generationCard.className = 'status-card generation';
                generationCard.innerHTML = `
                    <h4>
                        発電・消費バランス
                        <span class="tooltip">ℹ️
                            <span class="tooltiptext">発電量と消費量の比較。逆潮流は電力会社へ送電される余剰電力</span>
                        </span>
                    </h4>
                    <div class="status-value" id="generation-value">0W</div>
                    <div class="capacity-bar">
                        <div class="capacity-bar-fill" id="generation-bar" style="width: 0%; background-color: var(--solar-color);" data-value="0%"></div>
                    </div>
                    <div id="generation-status" style="margin-top: 10px; font-size: 14px; text-align: center;"></div>
                `;
                
                statusCards.appendChild(generationCard);
            }
            
            // カードを更新
            document.getElementById('generation-value').textContent = `${config.generationCapacity}W`;
            
            // 発電量と消費量の比率
            const generationRatio = Math.min(100, (config.generationCapacity / actualTotalLoad) * 100);
            
            // バー表示の更新
            const generationBar = document.getElementById('generation-bar');
            generationBar.style.width = `${generationRatio}%`;
            generationBar.setAttribute('data-value', `${Math.round(generationRatio)}%`);
            
            // ステータスメッセージ
            const generationStatus = document.getElementById('generation-status');
            if (config.generationCapacity > actualTotalLoad) {
                generationStatus.innerHTML = `<strong style="color:var(--solar-color)">逆潮流: ${Math.round(config.generationCapacity - actualTotalLoad)}W</strong><br>（発電量 > 消費量）`;
            } else {
                generationStatus.innerHTML = `<strong>通常給電: ${Math.round(actualTotalLoad - config.generationCapacity)}W</strong><br>（消費量 > 発電量）`;
            }
        }

        // 発電カードの削除
        function removeGenerationCard() {
            const generationCard = document.getElementById('generation-card');
            if (generationCard) {
                generationCard.remove();
            }
        }

        // SVGブレーカーをクリア
        function clearSVGBreakers() {
            document.getElementById('upper-breakers').innerHTML = '';
            document.getElementById('lower-breakers').innerHTML = '';
            document.getElementById('circuit-connections').innerHTML = '';
        }

        // すべてのブレーカーを描画（改良版）
        function renderAllBreakers() {
            const upperBreakers = document.getElementById('upper-breakers');
            const lowerBreakers = document.getElementById('lower-breakers');
            const connections = document.getElementById('circuit-connections');
            const svg = document.getElementById('distribution-panel');
            
            // 既存のSVG要素をクリア
            clearSVGBreakers();
            
            // 回路数と必要スペースの計算
            const circuitCount = circuits.length;
            let totalSpaces = 0;
            
            // 各回路の必要スペース数を計算
            circuits.forEach(circuit => {
                totalSpaces += breakerDefaults[circuit.breakerType]?.spaces || 1;
            });
            
            // 回路数に応じてスケーリング
            let breakerWidth = 50;
            let spacing = 65;
            let startX = 210;
            
            // 高スペース数の場合はスケーリングを適用
            if (totalSpaces >= 24) {
                const scaleFactor = Math.min(1, 24 / totalSpaces);
                breakerWidth = Math.max(35, Math.round(50 * scaleFactor));
                spacing = Math.max(45, Math.round(65 * scaleFactor));
            }
            
            // 必要な幅を計算（スペース数を考慮）
            const requiredWidth = startX + Math.ceil(totalSpaces / 2) * spacing + 100;
            const viewBoxWidth = Math.max(800, requiredWidth);
            
            // SVGのviewBoxを動的に設定
            svg.setAttribute('viewBox', `0 0 ${viewBoxWidth} 500`);
            
            // 配線バーの長さを調整
            const totalWidth = startX + Math.ceil(totalSpaces / 2) * spacing + 50;
            document.querySelectorAll('.wire').forEach(wire => {
                wire.setAttribute('x2', totalWidth);
            });
            
            // スペース配置のカウンタ
            let upperSpaceCount = 0;
            let lowerSpaceCount = 0;
            
            // 回路ごとの配置処理
            circuits.forEach((circuit, index) => {
                const isUpperRow = circuit.phase === 'R';
                const spaceCount = isUpperRow ? upperSpaceCount : lowerSpaceCount;
                const spaces = breakerDefaults[circuit.breakerType]?.spaces || 1;
                
                const x = startX + spaceCount * spacing;
                const y = isUpperRow ? 100 : 320;
                
                // 2スペース用のブレーカーは特別処理
                const isDoubleSpace = spaces === 2;
                
                const breaker = createBreaker(circuit, x, y, breakerWidth, isDoubleSpace);
                (isUpperRow ? upperBreakers : lowerBreakers).appendChild(breaker);
                
                if (circuit.breakerType !== '空き') {
                    const connection = createConnection(x + (isDoubleSpace ? breakerWidth : breakerWidth/2), y + (isUpperRow ? 80 : 0), isUpperRow ? 210 : 250, breakerWidth);
                    connections.appendChild(connection);
                }
                
                // スペースカウンターを更新
                if (isUpperRow) {
                    upperSpaceCount += spaces;
                } else {
                    lowerSpaceCount += spaces;
                }
            });
        }
        
        // ブレーカー要素を作成（改良版）
        function createBreaker(circuit, x, y, width, isDoubleSpace) {
            const breaker = document.createElementNS('http://www.w3.org/2000/svg', 'g');
            const breakerType = circuit.breakerType;
            const isSpecial = ['感震', '連系', '漏電', '空き'].includes(breakerType);
            const baseColor = breakerDefaults[breakerType]?.color || '#5cb85c';
            
            // クラス設定
            let classNames = `breaker ${isSpecial ? breakerType : ''} ${circuit.enabled ? 'on' : 'off'} ${breakerType === '空き' ? 'space' : ''}`;
            if (isDoubleSpace) classNames += ' double-space';
            
            breaker.setAttribute('class', classNames);
            breaker.setAttribute('transform', `translate(${x}, ${y})`);
            breaker.setAttribute('data-circuit', circuit.number);
            
            const fillColor = breakerType === '空き' ? '#f0f0f0' : (circuit.enabled ? baseColor : '#d32f2f');
            const strokeDash = breakerType === '空き' ? 'stroke-dasharray="3 3"' : '';
            
            // 2スペース用幅調整
            const actualWidth = isDoubleSpace ? width * 1.8 : width;
            
            // フォントサイズをブレーカー幅に応じて調整
            const fontSize1 = width > 45 ? 12 : 10;
            const fontSize2 = width > 45 ? 8 : 7;
            
            // 漏電ブレーカー用アイコン
            const elcbIcon = isDoubleSpace ? `
                <circle cx="${actualWidth/2}" cy="55" r="4" fill="white"/>
                <path d="M${actualWidth/2 - 10} 55 L${actualWidth/2 + 10} 55 M${actualWidth/2} 45 L${actualWidth/2} 65" stroke="white" stroke-width="1.5"/>
            ` : '';
            
            // 連系ブレーカー用アイコン
            const gridTieIcon = breakerType === '連系' ? `
                <path d="M${actualWidth/2 - 12} 40 L${actualWidth/2 + 12} 40 
                         M${actualWidth/2 - 8} 30 L${actualWidth/2 - 8} 50 
                         M${actualWidth/2 + 8} 30 L${actualWidth/2 + 8} 50" 
                      stroke="white" stroke-width="1.5"/>
                <circle cx="${actualWidth/2 - 8}" cy="30" r="3" fill="white"/>
                <circle cx="${actualWidth/2 + 8}" cy="50" r="3" fill="white"/>
            ` : '';
            
            const breakerHTML = `
                <rect x="0" y="0" width="${actualWidth}" height="80" fill="${fillColor}" rx="4" ${strokeDash}/>
                ${breakerType !== '空き' ? `
                    <text x="${actualWidth/2}" y="25" text-anchor="middle" fill="white" font-size="${fontSize1}" font-weight="bold" id="capacity-${circuit.number}">${circuit.current}A</text>
                    <text x="${actualWidth/2}" y="45" text-anchor="middle" fill="white" font-size="${fontSize2}" id="name-${circuit.number}">${isDoubleSpace ? circuit.name : circuit.name.substr(0, width > 45 ? 5 : 4)}</text>
                    <text x="${actualWidth/2}" y="65" text-anchor="middle" fill="white" font-size="${fontSize2}" id="load-${circuit.number}">${circuit.loadW}W</text>
                    <circle cx="${actualWidth/2}" cy="15" r="3" fill="white"/>
                    ${elcbIcon}
                    ${gridTieIcon}
                ` : `
                    <text x="${actualWidth/2}" y="45" text-anchor="middle" fill="#999" font-size="${width > 45 ? 10 : 8}">空き</text>
                `}
            `;
            
            breaker.innerHTML = breakerHTML;
            if (breakerType !== '空き') {
                breaker.addEventListener('click', function() { toggleBreaker(circuit.number); });
            }
            
            return breaker;
        }
        
        // 接続線を作成
        function createConnection(x1, y1, y2, breakerWidth) {
            const connection = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            connection.setAttribute('x1', x1);
            connection.setAttribute('y1', y1);
            connection.setAttribute('x2', x1);
            connection.setAttribute('y2', y2);
            connection.setAttribute('stroke', '#333');
            connection.setAttribute('stroke-width', '2');
            return connection;
        }

        // 回路数を設定（スペース計算を追加）
        function setCircuitCount(count) {
            count = parseInt(count);
            const currentCount = circuits.length;
            
            if (count < currentCount) {
                // 回路を削減
                circuits = circuits.slice(0, count);
            } else if (count > currentCount) {
                // 回路を追加
                for (let i = currentCount; i < count; i++) {
                    addDefaultCircuit(i + 1);
                }
            }
            
            // 相の再割り当て（漏電ブレーカーのスペース考慮）
            let rPhaseSpaces = 0;
            let tPhaseSpaces = 0;
            
            circuits.forEach((circuit, i) => {
                circuit.number = i + 1;
                
                // スペース数を取得
                const spaces = breakerDefaults[circuit.breakerType]?.spaces || 1;
                
                // 負荷バランスを考慮して相を割り当て
                if (rPhaseSpaces <= tPhaseSpaces) {
                    circuit.phase = 'R';
                    rPhaseSpaces += spaces;
                } else {
                    circuit.phase = 'T';
                    tPhaseSpaces += spaces;
                }
            });
            
            // 全回路の相別負荷を更新
            circuits.forEach(circuit => {
                updateCircuitPhaseLoads(circuit);
            });
            
            renderAllBreakers();
            renderCircuitTable();
            calculateAll();
        }

        // デフォルト回路追加（修正版）
        function addDefaultCircuit(number) {
            const circuit = {
                number: number,
                phase: number % 2 === 1 ? 'R' : 'T',
                breakerType: '2P1E',
                name: `回路${number}`,
                current: 20,
                voltage: 100,
                loadW: 1500,
                loadVA: 1500 / config.powerFactor,
                enabled: true,
                // R相とT相のVA負荷値を追加
                rPhaseVA: 0,
                tPhaseVA: 0
            };
            
            // 初期相別VA負荷計算
            updateCircuitPhaseLoads(circuit);
            
            circuits.push(circuit);
        }

        // 回路の相別VA負荷計算（新関数）
        function updateCircuitPhaseLoads(circuit) {
            if (circuit.breakerType === '空き' || circuit.loadW === 0) {
                circuit.rPhaseVA = 0;
                circuit.tPhaseVA = 0;
                return;
            }
            
            circuit.loadVA = circuit.loadW / config.powerFactor;
            
            if (circuit.voltage === 100) {
                // 100V回路は該当相のみに負荷がかかる
                if (circuit.phase === 'R') {
                    circuit.rPhaseVA = circuit.loadVA;
                    circuit.tPhaseVA = 0;
                } else {
                    circuit.rPhaseVA = 0;
                    circuit.tPhaseVA = circuit.loadVA;
                }
            } else if (circuit.voltage === 200) {
                // 200V回路は両相に均等に負荷がかかる
                circuit.rPhaseVA = circuit.loadVA / 2;
                circuit.tPhaseVA = circuit.loadVA / 2;
            }
        }

        // 回路テーブルの描画（改良版 - 相別VA表示対応）
        function renderCircuitTable() {
            const tbody = document.getElementById('circuit-table-body');
            tbody.innerHTML = '';
            
            circuits.forEach((circuit, index) => {
                const row = document.createElement('tr');
                const phaseClass = circuit.phase === 'R' ? 'phase-r' : 'phase-t';
                const isDoubleSpace = breakerDefaults[circuit.breakerType]?.spaces === 2;
                
                // 回路クラスを設定（相クラスと2スペースクラスの組み合わせ）
                if (isDoubleSpace) {
                    row.classList.add(phaseClass, 'double-space');
                } else {
                    row.classList.add(phaseClass);
                }
                
                // 相別VA負荷の計算を確実に行う
                updateCircuitPhaseLoads(circuit);
                
                row.innerHTML = `
                    <td class="${phaseClass}">${circuit.number}</td>
                    <td class="${phaseClass}">${circuit.phase}</td>
                    <td>
                        <select onchange="updateCircuit(${index}, 'breakerType', this.value)">
                            <option value="2P1E" ${circuit.breakerType === '2P1E' ? 'selected' : ''}>2P1E</option>
                            <option value="2P2E" ${circuit.breakerType === '2P2E' ? 'selected' : ''}>2P2E</option>
                            <option value="漏電" ${circuit.breakerType === '漏電' ? 'selected' : ''}>漏電</option>
                            <option value="感震" ${circuit.breakerType === '感震' ? 'selected' : ''}>感震</option>
                            <option value="連系" ${circuit.breakerType === '連系' ? 'selected' : ''}>連系</option>
                            <option value="空き" ${circuit.breakerType === '空き' ? 'selected' : ''}>空き</option>
                        </select>
                        ${isDoubleSpace ? '<span class="breaker-type double">2倍幅</span>' : ''}
                        ${circuit.breakerType === '漏電' ? '<span class="breaker-type elcb">漏電</span>' : ''}
                        ${circuit.breakerType === '連系' ? '<span class="breaker-type grid-tie">連系</span>' : ''}
                    </td>
                    <td><input type="text" value="${circuit.name}" onchange="updateCircuit(${index}, 'name', this.value)"></td>
                    <td>
                        <select onchange="updateCircuit(${index}, 'current', this.value)" ${circuit.breakerType === '空き' ? 'disabled' : ''}>
                            <option value="0" ${circuit.current === 0 ? 'selected' : ''}>-</option>
                            <option value="10" ${circuit.current === 10 ? 'selected' : ''}>10A</option>
                            <option value="15" ${circuit.current === 15 ? 'selected' : ''}>15A</option>
                            <option value="20" ${circuit.current === 20 ? 'selected' : ''}>20A</option>
                            <option value="30" ${circuit.current === 30 ? 'selected' : ''}>30A</option>
                            <option value="40" ${circuit.current === 40 ? 'selected' : ''}>40A</option>
                            <option value="50" ${circuit.current === 50 ? 'selected' : ''}>50A</option>
                        </select>
                    </td>
                    <td>
                        <select onchange="updateCircuit(${index}, 'voltage', this.value)" ${circuit.breakerType === '空き' ? 'disabled' : ''}>
                            <option value="0" ${circuit.voltage === 0 ? 'selected' : ''}>-</option>
                            <option value="100" ${circuit.voltage === 100 ? 'selected' : ''}>100V</option>
                            <option value="200" ${circuit.voltage === 200 ? 'selected' : ''}>200V</option>
                        </select>
                    </td>
                    <td><input type="number" value="${circuit.loadW}" onchange="updateCircuit(${index}, 'loadW', this.value)" min="0" max="10000" ${circuit.breakerType === '空き' ? 'disabled' : ''}></td>
                    <td class="r-phase-load"><input type="text" value="${Math.round(circuit.rPhaseVA)}" readonly style="background-color: rgba(255, 107, 107, 0.1);"></td>
                    <td class="t-phase-load"><input type="text" value="${Math.round(circuit.tPhaseVA)}" readonly style="background-color: rgba(77, 171, 247, 0.1);"></td>
                    <td>${isDoubleSpace ? '2' : '1'}</td>
                `;
                tbody.appendChild(row);
            });
        }

        // 回路データ更新（改良版 - 相別VA表示対応）
        function updateCircuit(index, field, value) {
            if (field === 'current' || field === 'voltage' || field === 'loadW') {
                value = parseFloat(value) || 0;
            }
            
            const circuit = circuits[index];
            const oldBreakerType = circuit.breakerType;
            
            // ブレーカータイプ変更時の処理
            if (field === 'breakerType') {
                const defaults = breakerDefaults[value];
                if (defaults) {
                    circuit.current = defaults.current;
                    circuit.voltage = defaults.voltage;
                    circuit.loadW = defaults.load;
                    circuit.enabled = value !== '空き';
                    // VA値も更新
                    circuit.loadVA = circuit.loadW / config.powerFactor;
                }
                
                // スペース数の変更があった場合、相のバランスを再計算
                if (breakerDefaults[oldBreakerType]?.spaces !== breakerDefaults[value]?.spaces) {
                    rebalancePhases();
                }
                
                // 連系ブレーカーへの変更または連系ブレーカーからの変更
                if ((oldBreakerType !== '連系' && value === '連系') || (oldBreakerType === '連系' && value !== '連系')) {
                    // 連系ブレーカーが追加された場合
                    if (value === '連系') {
                        // 発電容量が0なら設定を促す
                        if (config.generationCapacity === 0) {
                            const generationCapacity = prompt('連系ブレーカーを追加しました。発電設備の定格容量(W)を入力してください:', '3000');
                            if (generationCapacity !== null) {
                                config.generationCapacity = parseInt(generationCapacity) || 0;
                                document.getElementById('generation-capacity').value = config.generationCapacity;
                            }
                        }
                    }
                    
                    // 連系ブレーカーと発電容量の状態を更新
                    updateGridTieIndicator();
                    updateSolarIconVisibility();
                }
            }
            
            // 電圧変更時のデフォルト負荷設定
            if (field === 'voltage' && circuit.breakerType !== '空き') {
                if (value === 100) {
                    circuit.loadW = 1500;
                } else if (value === 200) {
                    circuit.loadW = 3000;
                }
            }
            
            circuit[field] = value;
            
            // W→VA計算（常に最新の力率を使用）と相別VA計算
            if (field === 'loadW' || field === 'voltage' || field === 'breakerType' || field === 'phase') {
                updateCircuitPhaseLoads(circuit);
            }
            
            renderAllBreakers();
            renderCircuitTable();
            calculateAll();
        }

        // 相のバランスの再計算
        function rebalancePhases() {
            let rPhaseSpaces = 0;
            let tPhaseSpaces = 0;
            
            // 現在のスペース数を計算
            circuits.forEach(circuit => {
                const spaces = breakerDefaults[circuit.breakerType]?.spaces || 1;
                if (circuit.phase === 'R') {
                    rPhaseSpaces += spaces;
                } else {
                    tPhaseSpaces += spaces;
                }
            });
            
            // 相の再割り当て（スペース数を考慮）
            rPhaseSpaces = 0;
            tPhaseSpaces = 0;
            
            circuits.forEach(circuit => {
                const spaces = breakerDefaults[circuit.breakerType]?.spaces || 1;
                
                // スペース数が均等になるように相を割り当て
                if (rPhaseSpaces <= tPhaseSpaces) {
                    circuit.phase = 'R';
                    rPhaseSpaces += spaces;
                } else {
                    circuit.phase = 'T';
                    tPhaseSpaces += spaces;
                }
                
                // 相が変更された場合、相別VA負荷を再計算
                updateCircuitPhaseLoads(circuit);
            });
        }

        // ブレーカー切り替え
        function toggleBreaker(circuitNum) {
            const circuit = circuits.find(c => c.number === circuitNum);
            if (circuit && circuit.breakerType !== '空き') {
                circuit.enabled = !circuit.enabled;
                
                const breaker = document.querySelector(`g[data-circuit="${circuitNum}"]`);
                if (breaker) {
                    const rect = breaker.querySelector('rect');
                    const breakerType = circuit.breakerType;
                    const baseColor = breakerDefaults[breakerType]?.color || '#5cb85c';
                    
                    if (circuit.enabled) {
                        breaker.classList.remove('off');
                        breaker.classList.add('on');
                        rect.setAttribute('fill', baseColor);
                    } else {
                        breaker.classList.remove('on');
                        breaker.classList.add('off');
                        rect.setAttribute('fill', '#d32f2f');
                    }
                }
                
                // 連系ブレーカーがON/OFFされたら太陽光アイコンを更新
                if (circuit.breakerType === '連系') {
                    updateSolarIconVisibility();
                }
                
                calculateAll();
            }
        }

        // 主幹ブレーカーのトグル
        function toggleMainBreaker() {
            const mainBreaker = document.getElementById('main-breaker');
            const isOn = mainBreaker.classList.contains('on');
            
            if (isOn) {
                // MLBをOFFにする
                mainBreaker.classList.remove('on');
                mainBreaker.classList.add('off');
                
                // 全回路をOFFにする
                circuits.forEach(circuit => {
                    circuit.enabled = false;
                });
                
                // SVGを再描画
                renderAllBreakers();
            } else {
                // MLBをONにする
                mainBreaker.classList.remove('off');
                mainBreaker.classList.add('on');
                
                // 全回路をONにする（空き以外）
                circuits.forEach(circuit => {
                    if (circuit.breakerType !== '空き') {
                        circuit.enabled = true;
                    }
                });
                
                // SVGを再描画
                renderAllBreakers();
            }
            
            calculateAll();
        }

        // 全体計算（改良版 - 相別VA表示対応）
        function calculateAll() {
            const mainBreaker = document.getElementById('main-breaker');
            const isMainOn = mainBreaker.classList.contains('on');
            
            // 初期化
            let rPhaseLoadVA = 0;
            let tPhaseLoadVA = 0;
            let totalLoadVA = 0;
            let totalLoadW = 0;
            
            // 各回路の負荷計算（不平衡率算出用：ON/OFF関係なく全回路で計算）
            circuits.forEach(circuit => {
                if (circuit.loadW > 0 && circuit.breakerType !== '空き') {
                    // 相別VA負荷の計算を確実に行う
                    updateCircuitPhaseLoads(circuit);
                    
                    totalLoadW += circuit.loadW;
                    totalLoadVA += circuit.loadVA;
                    
                    // 相別負荷の合計を計算
                    rPhaseLoadVA += circuit.rPhaseVA;
                    tPhaseLoadVA += circuit.tPhaseVA;
                }
            });
            
            // 不平衡率計算（全回路での計算）
            const avgLoadVA = (rPhaseLoadVA + tPhaseLoadVA) / 2;
            let imbalanceRate = 0;
            if (avgLoadVA > 0) {
                const maxLoadVA = Math.max(rPhaseLoadVA, tPhaseLoadVA);
                const minLoadVA = Math.min(rPhaseLoadVA, tPhaseLoadVA);
                imbalanceRate = ((maxLoadVA - minLoadVA) / avgLoadVA) * 100;
            }
            
            // 実際の使用電流計算用（ON回路のみ）
            let actualRPhaseLoadVA = 0;
            let actualTPhaseLoadVA = 0;
            let actualTotalLoadVA = 0;
            
            if (isMainOn) {
                circuits.forEach(circuit => {
                    if (circuit.enabled && circuit.loadW > 0 && circuit.breakerType !== '空き') {
                        actualTotalLoadVA += circuit.loadVA;
                        actualRPhaseLoadVA += circuit.rPhaseVA;
                        actualTPhaseLoadVA += circuit.tPhaseVA;
                    }
                });
            }
            
            // 需要率適用後の負荷計算（実際のON回路のみ）に同時使用率を加味
            const totalLoadAfterDemand = actualTotalLoadVA * config.demandFactor * config.simultaneityFactor;
            
            // ★発電容量の考慮（連系ブレーカーがONの場合のみ有効）★
            const hasActiveGridTie = circuits.some(c => c.breakerType === '連系' && c.enabled);
            let effectiveGenerationCapacity = hasActiveGridTie ? config.generationCapacity : 0;
            
            // ★発電による負荷軽減（最小0まで）★
            const totalLoadWithGeneration = Math.max(0, totalLoadAfterDemand - (effectiveGenerationCapacity * config.powerFactor));
            
            // 発電情報の表示更新
            updateGenerationCard(totalLoadAfterDemand);
            
            // ★発電設備の影響を計算ロジックに表示★
            const generationEffectCalc = document.getElementById('generation-effect-calc');
            if (effectiveGenerationCapacity > 0) {
                generationEffectCalc.style.display = 'block';
                document.getElementById('generation-effect-value').textContent = 
                    `${totalLoadAfterDemand.toFixed(0)}VA - ${(effectiveGenerationCapacity * config.powerFactor).toFixed(0)}VA = ${totalLoadWithGeneration.toFixed(0)}VA`;
                
                // 発電影響の容量計算表示も更新
                document.getElementById('generation-effect-group').style.display = 'block';
                document.getElementById('generation-reduction').value = 
                    `${(effectiveGenerationCapacity * config.powerFactor).toFixed(0)}VA (${effectiveGenerationCapacity}W)`;
            } else {
                generationEffectCalc.style.display = 'none';
                document.getElementById('generation-effect-group').style.display = 'none';
            }
            
            // 主幹容量計算（電流）
            // 固定容量が設定されていなければ自動計算
            let recommendedMainCapacity;
            
            if (config.fixedMainCapacity === 0) {
                // ★自動計算ロジック（発電容量を考慮）★
                const mainCurrentRequired = totalLoadWithGeneration / 200;
                const mainCapacityRequired = Math.ceil(mainCurrentRequired / 5) * 5; // 5A単位で切り上げ
                
                // 標準容量から選択
                const standardCapacities = [30, 40, 50, 60, 75, 100];
                recommendedMainCapacity = standardCapacities.find(cap => cap >= mainCapacityRequired) || 100;
            } else {
                // 固定値を使用
                recommendedMainCapacity = config.fixedMainCapacity;
            }
            
            // 幹線径選定（詳細計算）
            // ★発電容量を考慮した電流値で計算★
            const requiredCurrent = (totalLoadWithGeneration / 200) / config.cableSafetyFactor;
            const cable = cvtCables.find(c => c.allowableCurrent >= requiredCurrent);
            const recommendedCable = cable ? `CVT ${cable.size}` : 'CVT 200sq以上';
            
            // 幹線径計算式
            const mainCurrentForCable = totalLoadWithGeneration / 200;
            const cableFormula = `必要電流 = ${mainCurrentForCable.toFixed(1)}A ÷ 安全率${config.cableSafetyFactor} = ${requiredCurrent.toFixed(1)}A`;
            
            // 相電流計算
            const rPhaseAmpere = actualRPhaseLoadVA * config.demandFactor / 100;
            const tPhaseAmpere = actualTPhaseLoadVA * config.demandFactor / 100;
            
            // 表示更新（実際の使用電流のみ表示）
            updateDisplay(
                actualRPhaseLoadVA, 
                actualTPhaseLoadVA, 
                rPhaseAmpere,
                tPhaseAmpere,
                actualTotalLoadVA, 
                totalLoadAfterDemand, 
                totalLoadWithGeneration,
                imbalanceRate,
                recommendedMainCapacity
            );
            
            // 計算ロジック表示
            const imbalanceCalc = `|${Math.max(rPhaseLoadVA, tPhaseLoadVA).toFixed(0)} - ${Math.min(rPhaseLoadVA, tPhaseLoadVA).toFixed(0)}| ÷ ${avgLoadVA.toFixed(0)} × 100 = ${imbalanceRate.toFixed(1)}%`;
            // ★発電容量を考慮した主幹計算式の表示★
            const mainCalc = `(${(totalLoadVA * config.demandFactor).toFixed(0)}VA${effectiveGenerationCapacity > 0 ? 
                ` - ${(effectiveGenerationCapacity * config.powerFactor).toFixed(0)}VA` : ''}) ÷ 200V = ${(totalLoadWithGeneration / 200).toFixed(1)}A → ${recommendedMainCapacity}A`;
            
            updateCalculationLogic(rPhaseLoadVA, tPhaseLoadVA, imbalanceCalc, mainCalc, recommendedCable, cableFormula);
            
            // 主幹ブレーカー容量表示更新
            document.getElementById('mlb-capacity').textContent = `${recommendedMainCapacity}A`;
            
            // Panasonic品番選定
            selectPanasonicModel(recommendedMainCapacity, circuits.length);
        }

        // 表示更新（実際の使用電流のみ表示）
        function updateDisplay(rPhaseVA, tPhaseVA, rPhaseA, tPhaseA, totalBefore, totalAfterDemand, totalAfterGeneration, imbalanceRate, mainCapacity) {
            // 単相3線式の総使用電流は需要率適用後の値を200Vで割る
            const totalCurrent = totalAfterGeneration / 200;
            document.getElementById('total-current').textContent = `${totalCurrent.toFixed(1)}A`;
            document.getElementById('imbalance-rate').textContent = `${imbalanceRate.toFixed(1)}%`;
            
            // R相とT相の個別電流表示
            document.getElementById('r-phase-current').textContent = `${rPhaseA.toFixed(1)}A`;
            document.getElementById('t-phase-current').textContent = `${tPhaseA.toFixed(1)}A`;
            
            // R相とT相のVA表示
            document.getElementById('r-phase-va').textContent = `${Math.round(rPhaseVA)}VA`;
            document.getElementById('t-phase-va').textContent = `${Math.round(tPhaseVA)}VA`;
            
            // 不平衡率の警告表示
            const imbalanceCard = document.getElementById('imbalance-card');
            const imbalanceWarning = document.getElementById('imbalance-warning');
            
            if (imbalanceRate > config.imbalanceLimit) {
                imbalanceCard.classList.add('danger');
                imbalanceCard.classList.remove('warning');
                imbalanceWarning.style.display = 'flex';
            } else if (imbalanceRate > config.imbalanceLimit * 0.8) {
                imbalanceCard.classList.add('warning');
                imbalanceCard.classList.remove('danger');
                imbalanceWarning.style.display = 'none';
            } else {
                imbalanceCard.classList.remove('warning', 'danger');
                imbalanceWarning.style.display = 'none';
            }
            
            // 電流容量バー更新
            const currentBar = document.getElementById('current-bar');
            const rPhaseBar = document.getElementById('r-phase-bar');
            const tPhaseBar = document.getElementById('t-phase-bar');
            
            const currentPercentage = (totalCurrent / mainCapacity) * 100;
            const rPhasePercentage = (rPhaseA / mainCapacity) * 100;
            const tPhasePercentage = (tPhaseA / mainCapacity) * 100;
            
            currentBar.style.width = `${Math.min(currentPercentage, 100)}%`;
            currentBar.setAttribute('data-value', `${Math.round(currentPercentage)}%`);
            
            rPhaseBar.style.width = `${Math.min(rPhasePercentage, 100)}%`;
            rPhaseBar.setAttribute('data-value', `${Math.round(rPhasePercentage)}%`);
            
            tPhaseBar.style.width = `${Math.min(tPhasePercentage, 100)}%`;
            tPhaseBar.setAttribute('data-value', `${Math.round(tPhasePercentage)}%`);
            
            // 電流バーの色設定
            if (currentPercentage > 90) {
                currentBar.classList.add('danger');
                currentBar.classList.remove('warning');
            } else if (currentPercentage > 70) {
                currentBar.classList.add('warning');
                currentBar.classList.remove('danger');
            } else {
                currentBar.classList.remove('warning', 'danger');
            }
            
            // 不平衡率バーの更新
            const imbalanceBar = document.getElementById('imbalance-bar');
            const imbalancePercentage = (imbalanceRate / config.imbalanceLimit) * 100;
            
            imbalanceBar.style.width = `${Math.min(imbalancePercentage, 100)}%`;
            imbalanceBar.setAttribute('data-value', `${Math.round(imbalanceRate)}%`);
            
            if (imbalancePercentage > 100) {
                imbalanceBar.classList.add('danger');
                imbalanceBar.classList.remove('warning');
            } else if (imbalancePercentage > 80) {
                imbalanceBar.classList.add('warning');
                imbalanceBar.classList.remove('danger');
            } else {
                imbalanceBar.classList.remove('warning', 'danger');
            }
            
            // 容量計算結果の表示更新
            document.getElementById('r-phase-load').value = `${Math.round(rPhaseVA)}VA`;
            document.getElementById('t-phase-load').value = `${Math.round(tPhaseVA)}VA`;
            document.getElementById('r-phase-ampere').value = `${rPhaseA.toFixed(1)}A`;
            document.getElementById('t-phase-ampere').value = `${tPhaseA.toFixed(1)}A`;
            document.getElementById('total-load-before').value = `${Math.round(totalBefore)}VA`;
            document.getElementById('total-load-after').value = `${Math.round(totalAfterDemand)}VA`;
            document.getElementById('recommended-main').value = `${mainCapacity}A`;
            document.getElementById('imbalance-result').value = `${imbalanceRate.toFixed(1)}%（基準値：${config.imbalanceLimit}%）`;
            
            const cable = cvtCables.find(c => c.allowableCurrent >= parseInt(mainCapacity));
            document.getElementById('recommended-cable').value = cable ? `CVT ${cable.size}` : 'CVT 200sq以上';
            
            // 幹線径計算詳細
            const mainCurrent = totalAfterGeneration / 200;
            const requiredCurrent = mainCurrent / config.cableSafetyFactor;
            const actualCable = cvtCables.find(c => c.allowableCurrent >= requiredCurrent);
            
            // 発電容量の影響を含めた詳細表示
            const hasActiveGridTie = circuits.some(c => c.breakerType === '連系' && c.enabled);
            let effectiveGeneration = hasActiveGridTie ? config.generationCapacity : 0;
            
            const detail = `● 負荷集計\n` +
                         `・R相負荷: ${Math.round(rPhaseVA)}VA (${rPhaseA.toFixed(1)}A)\n` +
                         `・T相負荷: ${Math.round(tPhaseVA)}VA (${tPhaseA.toFixed(1)}A)\n` +
                         `・総負荷(需要率適用前): ${Math.round(totalBefore)}VA\n` +
                         `・不平衡率: ${imbalanceRate.toFixed(1)}%\n` +
                         (effectiveGeneration > 0 ? `・発電容量: ${effectiveGeneration}W (${(effectiveGeneration * config.powerFactor).toFixed(0)}VA)\n` : '') +
                         `\n● 計算パラメータ\n` +
                         `・需要率: ${config.demandFactor}\n` +
                         `・力率: ${config.powerFactor}\n` +
                         `・同時使用率: ${config.simultaneityFactor}\n` +
                         `・安全率: ${config.cableSafetyFactor}\n` +
                         `\n● 容量計算\n` +
                         `・総負荷(需要率適用後): ${Math.round(totalAfterDemand)}VA\n` +
                         (effectiveGeneration > 0 ? `・発電影響後の負荷: ${Math.round(totalAfterGeneration)}VA\n` : '') +
                         `・主幹電流: ${mainCurrent.toFixed(1)}A\n` +
                         `・必要電流: ${mainCurrent.toFixed(1)}A ÷ 安全率${config.cableSafetyFactor} = ${requiredCurrent.toFixed(1)}A\n` +
                         `・選定結果: ${actualCable ? `CVT ${actualCable.size} (許容電流: ${actualCable.allowableCurrent}A)` : '規格外'}`;
                         
            document.getElementById('cable-calculation-detail').value = detail;
        }

        // 計算ロジック表示更新
        function updateCalculationLogic(rPhaseVA, tPhaseVA, imbalanceCalc, mainCalc, cableCalc, cableFormula) {
            document.getElementById('r-phase-load-display').textContent = `${Math.round(rPhaseVA)}VA`;
            document.getElementById('t-phase-load-display').textContent = `${Math.round(tPhaseVA)}VA`;
            document.getElementById('imbalance-calc').textContent = imbalanceCalc;
            document.getElementById('main-calc').textContent = mainCalc;
            document.getElementById('cable-calc-formula').textContent = cableFormula;
            document.getElementById('cable-calc-result').textContent = `推奨: ${cableCalc}`;
            
            // 設定表示の更新
            updateConfigDisplay();
        }

        // 設定表示の更新
        function updateConfigDisplay() {
            document.getElementById('display-demand-factor').textContent = config.demandFactor;
            document.getElementById('display-power-factor').textContent = config.powerFactor;
            document.getElementById('display-imbalance-limit').textContent = `${config.imbalanceLimit}%`;
            document.getElementById('display-safety-factor').textContent = config.cableSafetyFactor;
            document.getElementById('display-simultaneity-factor').textContent = config.simultaneityFactor;
        }

        // CSV出力機能（相別VA表示対応版）
        function exportToCSV() {
            // 計算実行
            calculateAll();
            
            // CSVヘッダー（UTF-8でBOM付き）
            let csvContent = '回路番号,相,種類,名称,ブレーカーサイズ(A),電圧(V),負荷(W),R相負荷(VA),T相負荷(VA),スペース数,状態\n';
            
            // 回路データ
            circuits.forEach(circuit => {
                const spaces = breakerDefaults[circuit.breakerType]?.spaces || 1;
                csvContent += `${circuit.number},${circuit.phase},${circuit.breakerType},${circuit.name},${circuit.current},${circuit.voltage},${circuit.loadW},${Math.round(circuit.rPhaseVA)},${Math.round(circuit.tPhaseVA)},${spaces},${circuit.enabled ? 'ON' : 'OFF'}\n`;
            });
            
            // 相毎の集計を計算（全回路で計算）
            let rPhaseLoadVA = 0;
            let tPhaseLoadVA = 0;
            let totalLoadVA = 0;
            
            circuits.forEach(circuit => {
                if (circuit.loadW > 0 && circuit.breakerType !== '空き') {
                    totalLoadVA += circuit.loadVA;
                    rPhaseLoadVA += circuit.rPhaseVA;
                    tPhaseLoadVA += circuit.tPhaseVA;
                }
            });
            
            // 集計データを追加
            csvContent += '\n集計データ\n';
            csvContent += 'R相負荷(VA),T相負荷(VA),総負荷(VA),不平衡率(%)\n';
            
            const avgLoadVA = (rPhaseLoadVA + tPhaseLoadVA) / 2;
            let imbalanceRate = 0;
            if (avgLoadVA > 0) {
                const maxLoadVA = Math.max(rPhaseLoadVA, tPhaseLoadVA);
                const minLoadVA = Math.min(rPhaseLoadVA, tPhaseLoadVA);
                imbalanceRate = ((maxLoadVA - minLoadVA) / avgLoadVA) * 100;
            }
            
            csvContent += `${Math.round(rPhaseLoadVA)},${Math.round(tPhaseLoadVA)},${Math.round(totalLoadVA)},${imbalanceRate.toFixed(1)}\n`;
            
            // 需要率適用後のデータ
            const totalLoadAfterDemand = totalLoadVA * config.demandFactor;
            csvContent += '\n需要率適用後\n';
            csvContent += '需要率,力率,同時使用率,総負荷(VA),主幹電流(A)\n';
            csvContent += `${config.demandFactor},${config.powerFactor},${config.simultaneityFactor},${Math.round(totalLoadAfterDemand)},${(totalLoadAfterDemand / 200).toFixed(1)}\n`;
            
            // 発電データ
            if (config.generationCapacity > 0) {
                csvContent += '\n発電設備\n';
                csvContent += '発電容量(W),発電VA,連系ブレーカー有無\n';
                csvContent += `${config.generationCapacity},${Math.round(config.generationCapacity * config.powerFactor)},${hasGridTieBreaker() ? 'あり' : 'なし'}\n`;
            }
            
            // システム設定
            csvContent += '\nシステム設定\n';
            csvContent += '不平衡率基準(%),安全率,主幹容量(A),余裕回路数\n';
            csvContent += `${config.imbalanceLimit},${config.cableSafetyFactor},${config.fixedMainCapacity || '自動計算'},${config.minSpareCircuits}\n`;
            
            // BOMを付加（Excelでの文字化け対策）
            const bom = '\uFEFF';
            const blob = new Blob([bom + csvContent], { type: 'text/csv;charset=utf-8;' });
            
            // ファイル名を生成（現在の日時を使用）
            const date = new Date();
            const filename = `分電盤負荷計算_${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, '0')}${String(date.getDate()).padStart(2, '0')}_${String(date.getHours()).padStart(2, '0')}${String(date.getMinutes()).padStart(2, '0')}.csv`;
            
            // ダウンロード処理
            const link = document.createElement('a');
            if (link.download !== undefined) {
                const url = URL.createObjectURL(blob);
                link.setAttribute('href', url);
                link.setAttribute('download', filename);
                link.style.visibility = 'hidden';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
        }

        // Panasonic品番選定（改良版）
        function selectPanasonicModel(mainCapacity, circuitCount) {
            // 実際のスペース数を計算
            let totalSpaces = 0;
            circuits.forEach(circuit => {
                totalSpaces += breakerDefaults[circuit.breakerType]?.spaces || 1;
            });
            
            // 余裕スペースを追加
            const requiredSpaces = totalSpaces + config.minSpareCircuits;
            
            // 必要回路数に最適な分電盤を選定
            // 主幹容量と必要回路数から最適なモデルを選定
            const key = `${mainCapacity}-${Math.ceil(requiredSpaces/2)*2}`; // 偶数に切り上げ
            
            // スマートコスモ（BQWF）シリーズを優先的に検討
            if (mainCapacity >= 50 && requiredSpaces <= 18 && panasonicModels.BQWF.models[key]) {
                const model = panasonicModels.BQWF.models[key];
                document.getElementById('panasonic-model').value = model;
                document.getElementById('panasonic-type').value = panasonicModels.BQWF.name;
                
                // 商品リンクの設定
                const link = document.getElementById('panasonic-link');
                link.href = panasonicModels.BQWF.baseUrl;
                link.textContent = `${model} - ${panasonicModels.BQWF.name}`;
                return;
            }
            
            // 通常のBQRシリーズで検索
            const model = panasonicModels.BQR.models[key];
            
            if (model) {
                document.getElementById('panasonic-model').value = model;
                document.getElementById('panasonic-type').value = panasonicModels.BQR.name;
                
                // 商品リンクの設定
                const link = document.getElementById('panasonic-link');
                link.href = panasonicModels.BQR.baseUrl;
                link.textContent = `${model} - ${panasonicModels.BQR.name}`;
            } else {
                // 適合するモデルがない場合
                let closestModel = '';
                let closestDiff = 999;
                let preferredSeries = 'BQR';
                
                // BQRシリーズで近似品番を検索
                for (const [modelKey, modelValue] of Object.entries(panasonicModels.BQR.models)) {
                    const [modelMain, modelCircuits] = modelKey.split('-').map(Number);
                    if (modelMain >= mainCapacity && modelCircuits >= requiredSpaces) {
                        const diff = (modelMain - mainCapacity) + (modelCircuits - requiredSpaces);
                        if (diff < closestDiff) {
                            closestDiff = diff;
                            closestModel = modelValue;
                            preferredSeries = 'BQR';
                        }
                    }
                }
                
                // BQWFシリーズも考慮
                if (mainCapacity >= 50) {
                    for (const [modelKey, modelValue] of Object.entries(panasonicModels.BQWF.models)) {
                        const [modelMain, modelCircuits] = modelKey.split('-').map(Number);
                        if (modelMain >= mainCapacity && modelCircuits >= requiredSpaces) {
                            const diff = (modelMain - mainCapacity) + (modelCircuits - requiredSpaces);
                            // スマートコスモを優先するために少し小さい値を使用
                            if (diff * 0.9 < closestDiff) {
                                closestDiff = diff * 0.9;
                                closestModel = modelValue;
                                preferredSeries = 'BQWF';
                            }
                        }
                    }
                }
                
                if (closestModel) {
                    document.getElementById('panasonic-model').value = closestModel + ' (近似品番)';
                    document.getElementById('panasonic-type').value = panasonicModels[preferredSeries].name;
                    
                    const link = document.getElementById('panasonic-link');
                    link.href = panasonicModels[preferredSeries].baseUrl;
                    link.textContent = `${closestModel} - ${panasonicModels[preferredSeries].name} (近似品番)`;
                } else {
                    document.getElementById('panasonic-model').value = '該当なし（特注品）';
                    document.getElementById('panasonic-type').value = '個別相談';
                    document.getElementById('panasonic-link').href = 'https://www2.panasonic.biz/jp/densetsu/denro/compact21/';
                    document.getElementById('panasonic-link').textContent = 'Panasonic分電盤総合ページ';
                }
            }
        }

        // タブ切り替え
        function switchTab(tab) {
            document.querySelectorAll('.tab-nav button').forEach(btn => {
                btn.classList.remove('active');
            });
            
            const buttons = document.querySelectorAll('.tab-nav button');
            for (let i = 0; i < buttons.length; i++) {
                if (buttons[i].textContent.includes(tab === 'circuits' ? '回路設定' : 
                                                tab === 'system' ? 'システム設定' : 
                                                tab === 'calculation' ? '容量計算' : 
                                                tab === 'explanation' ? '解説' : '使い方')) {
                    buttons[i].classList.add('active');
                }
            }
            
            document.querySelectorAll('.tab-content').forEach(content => {
                content.classList.remove('active');
            });
            document.getElementById(`${tab}-tab`).classList.add('active');
        }

        // 設定保存
        function saveConfig() {
            const oldGenerationCapacity = config.generationCapacity;
            
            config.demandFactor = parseFloat(document.getElementById('demand-factor').value);
            config.powerFactor = parseFloat(document.getElementById('power-factor').value);
            config.imbalanceLimit = parseFloat(document.getElementById('imbalance-limit').value);
            config.generationCapacity = parseFloat(document.getElementById('generation-capacity').value) || 0;
            config.cableSafetyFactor = parseFloat(document.getElementById('cable-safety-factor').value);
            config.simultaneityFactor = parseFloat(document.getElementById('simultaneity-factor').value);
            config.fixedMainCapacity = parseInt(document.getElementById('fixed-main-capacity').value);
            config.minSpareCircuits = parseInt(document.getElementById('min-spare-circuits').value);
            
            // すべての回路のVA値を再計算
            circuits.forEach(circuit => {
                if (circuit.loadW > 0) {
                    updateCircuitPhaseLoads(circuit);
                }
            });
            
            // 発電容量が変更された場合の処理
            if (oldGenerationCapacity !== config.generationCapacity) {
                // 発電容量が0 → 設定された場合で連系ブレーカーがない場合
                if (oldGenerationCapacity === 0 && config.generationCapacity > 0 && !hasGridTieBreaker()) {
                    const addGridTie = confirm('発電容量を設定しました。連系ブレーカーを追加しますか？');
                    if (addGridTie) {
                        addGridTieBreaker();
                    }
                }
                
                // 太陽光アイコンの表示更新
                updateSolarIconVisibility();
                
                // 発電容量が0になった場合、発電カードを削除
                if (config.generationCapacity === 0) {
                    removeGenerationCard();
                }
            }
            
            // 主幹容量を再計算
            calculateAll();
            
            // 設定表示の更新
            updateConfigDisplay();
            
            // 成功通知
            alert('設定を保存しました');
        }

        // 全クリア
        function clearAll() {
            if (confirm('すべての回路データをクリアしますか？')) {
                circuits.forEach(circuit => {
                    circuit.loadW = 0;
                    circuit.loadVA = 0;
                    circuit.rPhaseVA = 0;
                    circuit.tPhaseVA = 0;
                });
                renderCircuitTable();
                renderAllBreakers();
                calculateAll();
                
                alert('全ての回路データをクリアしました');
            }
        }

        // プリセット読み込み（改良版 - 相別VA対応）
        function loadPreset(presetName) {
            const preset = presets[presetName];
            if (!preset) return;
            
            // 回路数を設定
            setCircuitCount(preset.circuits.length);
            
            // 相のバランスを考慮して再割り当て
            let rPhaseSpaces = 0;
            let tPhaseSpaces = 0;
            
            // 各回路の設定を適用
            preset.circuits.forEach((presetCircuit, index) => {
                if (index < circuits.length) {
                    // ブレーカータイプを設定
                    circuits[index].breakerType = presetCircuit.type;
                    
                    // スペース数を取得
                    const spaces = breakerDefaults[presetCircuit.type]?.spaces || 1;
                    
                    // 負荷バランスを考慮して相を割り当て
                    if (rPhaseSpaces <= tPhaseSpaces) {
                        circuits[index].phase = 'R';
                        rPhaseSpaces += spaces;
                    } else {
                        circuits[index].phase = 'T';
                        tPhaseSpaces += spaces;
                    }
                    
                    // その他の設定を適用
                    circuits[index].voltage = presetCircuit.voltage;
                    circuits[index].loadW = presetCircuit.load;
                    circuits[index].name = presetCircuit.name;
                    circuits[index].current = presetCircuit.current || 20;
                    circuits[index].enabled = true;
                    
                    // 相別VA負荷を計算
                    updateCircuitPhaseLoads(circuits[index]);
                }
            });
            
            // プリセットに発電容量設定がある場合は適用
            if (preset.generationCapacity) {
                config.generationCapacity = preset.generationCapacity;
                document.getElementById('generation-capacity').value = config.generationCapacity;
            }
            
            // 連系ブレーカーと発電容量の関連付けを更新
            updateGridTieIndicator();
            updateSolarIconVisibility();
            
            renderAllBreakers();
            renderCircuitTable();
            calculateAll();
            
            alert(`${preset.name}のプリセットを読み込みました`);
        }

        // 解説タブの機能
        function toggleSection(sectionId) {
            const section = document.getElementById(sectionId);
            section.classList.toggle('collapsed');
        }

        function toggleFAQ(element) {
            const faqItem = element.parentElement;
            faqItem.classList.toggle('open');
        }

        // インタラクティブデモの更新
        function updateLoadDemo() {
            const rLoad = parseFloat(document.getElementById('demo-r-load').value) || 0;
            const tLoad = parseFloat(document.getElementById('demo-t-load').value) || 0;
            const demand = parseFloat(document.getElementById('demo-demand').value) || 0.4;
            
            const avgLoad = (rLoad + tLoad) / 2;
            const imbalance = avgLoad > 0 ? Math.abs(rLoad - tLoad) / avgLoad * 100 : 0;
            const totalLoad = (rLoad + tLoad) * demand;
            const mainCurrent = totalLoad / 200;
            
            const resultText = `
                不平衡率: ${imbalance.toFixed(1)}%<br>
                総負荷（需要率適用後）: ${totalLoad.toFixed(0)}VA<br>
                必要主幹電流: ${mainCurrent.toFixed(1)}A<br>
                推奨主幹容量: ${Math.ceil(mainCurrent / 5) * 5}A
            `;
            
            document.getElementById('demo-result').innerHTML = resultText;
        }
