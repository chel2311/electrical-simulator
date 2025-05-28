// Circuit Simulator JavaScript
document.addEventListener('DOMContentLoaded', function() {
  // ヘルプチップ機能
  const helpTips = document.querySelectorAll('.help-tip');
  const tooltip = document.getElementById('tooltip');
  
  helpTips.forEach(tip => {
    tip.addEventListener('mouseenter', (e) => {
      const tipText = tip.getAttribute('data-tip');
      tooltip.textContent = tipText;
      tooltip.style.display = 'block';
      tooltip.style.left = (e.pageX + 10) + 'px';
      tooltip.style.top = (e.pageY + 10) + 'px';
    });
    
    tip.addEventListener('mouseleave', () => {
      tooltip.style.display = 'none';
    });
  });
  
  // トラブルシューティングのヒント・解決策表示
  document.getElementById('troubleHint1').addEventListener('click', () => {
    document.getElementById('hint1').style.display = 'block';
  });
  
  document.getElementById('troubleSolution1').addEventListener('click', () => {
    document.getElementById('solution1').style.display = 'block';
  });
  
  document.getElementById('troubleHint2').addEventListener('click', () => {
    document.getElementById('hint2').style.display = 'block';
  });
  
  document.getElementById('troubleSolution2').addEventListener('click', () => {
    document.getElementById('solution2').style.display = 'block';
  });
  
  // クイズの回答チェック
  document.getElementById('checkAnswersBtn').addEventListener('click', () => {
    const answers = {
      q1: 'a', // 1箇所
      q2: 'c', // 赤線（R）/トラベラー線
      q3: 'b', // 3箇所
      q4: 'b', // 電気工事士
      q5: 'c'  // 15A
    };
    
    let score = 0;
    let results = '<h3>結果</h3>';
    
    for (const q in answers) {
      const selectedAnswer = document.querySelector(`input[name="${q}"]:checked`);
      
      if (selectedAnswer) {
        if (selectedAnswer.value === answers[q]) {
          score++;
          results += `<p>問${q.substring(1)}: ✓ 正解！</p>`;
        } else {
          results += `<p>問${q.substring(1)}: ✗ 不正解</p>`;
        }
      } else {
        results += `<p>問${q.substring(1)}: 未回答</p>`;
      }
    }
    
    results += `<p>スコア: ${score}/${Object.keys(answers).length}</p>`;
    
    if (score === Object.keys(answers).length) {
      results += '<p style="color: green; font-weight: bold;">おめでとうございます！全問正解です。</p>';
    } else if (score >= Object.keys(answers).length * 0.8) {
      results += '<p style="color: blue; font-weight: bold;">よくできました！</p>';
    } else if (score >= Object.keys(answers).length * 0.6) {
      results += '<p style="color: orange;">もう少し！再度学習内容を確認しましょう。</p>';
    } else {
      results += '<p style="color: red;">各セクションをもう一度復習しましょう。</p>';
    }
    
    document.getElementById('quizResults').innerHTML = results;
    document.getElementById('quizResults').style.display = 'block';
  });
  
  // ナビゲーションメニュー切り替え
  const navItems = document.querySelectorAll('.nav-item');
  navItems.forEach(item => {
    item.addEventListener('click', () => {
      // アクティブなナビアイテムを更新
      navItems.forEach(navItem => navItem.classList.remove('active'));
      item.classList.add('active');
      
      // セクションの切り替え
      const sectionId = item.getAttribute('data-section');
      document.querySelectorAll('.section-container').forEach(section => {
        section.classList.remove('active');
      });
      document.getElementById(sectionId + 'Section').classList.add('active');
    });
  });
  
  // スイッチ回路の要素取得
  const singleSwitch = document.getElementById('singleSwitch');
  const singleSwitchLine = document.getElementById('singleSwitchLine');
  const singleSwitchLamp = document.getElementById('singleSwitchLamp');
  const singleSwitchStatus = document.getElementById('singleSwitchStatus');
  const singleSwitchCurrent = document.getElementById('singleSwitchCurrent');
  const singleSwitchVoltage = document.getElementById('singleSwitchVoltage');
  const singleSwitchCurrentValue = document.getElementById('singleSwitchCurrent');
  const singleSwitchPower = document.getElementById('singleSwitchPower');
  
  // 3路スイッチの要素取得
  const threeWaySwitch1 = document.getElementById('threeWaySwitch1');
  const threeWaySwitch2 = document.getElementById('threeWaySwitch2');
  const threeWaySwitch1Line = document.getElementById('threeWaySwitch1Line');
  const threeWaySwitch2Line = document.getElementById('threeWaySwitch2Line');
  const threeWaySwitchLamp = document.getElementById('threeWaySwitchLamp');
  const threeWaySwitchStatus = document.getElementById('threeWaySwitchStatus');
  const threeWaySwitchCurrent = document.getElementById('threeWaySwitchCurrent');
  const threeWaySwitchVoltage = document.getElementById('threeWaySwitchVoltage');
  const threeWaySwitchCurrentValue = document.getElementById('threeWaySwitchCurrentValue');
  const threeWaySwitchPower = document.getElementById('threeWaySwitchPower');
  
  // 4路スイッチの要素取得
  const fourWaySwitch1 = document.getElementById('fourWaySwitch1');
  const fourWayMiddleSwitch = document.getElementById('fourWayMiddleSwitch');
  const fourWaySwitch2 = document.getElementById('fourWaySwitch2');
  const fourWaySwitch1Line = document.getElementById('fourWaySwitch1Line');
  const fourWayMiddleSwitch1 = document.getElementById('fourWayMiddleSwitch1');
  const fourWayMiddleSwitch2 = document.getElementById('fourWayMiddleSwitch2');
  const fourWaySwitch2Line = document.getElementById('fourWaySwitch2Line');
  const fourWaySwitchLamp = document.getElementById('fourWaySwitchLamp');
  const fourWaySwitchStatus = document.getElementById('fourWaySwitchStatus');
  const fourWaySwitchCurrent = document.getElementById('fourWaySwitchCurrent');
  const fourWaySwitchVoltage = document.getElementById('fourWaySwitchVoltage');
  const fourWaySwitchCurrentValue = document.getElementById('fourWaySwitchCurrentValue');
  const fourWaySwitchPower = document.getElementById('fourWaySwitchPower');
  
  // 状態変数
  let singleSwitchOn = false;
  let threeWaySwitch1On = false;
  let threeWaySwitch2On = false;
  let fourWaySwitch1On = false;
  let fourWayMiddleSwitchOn = false;
  let fourWaySwitch2On = false;
  
  // シングルスイッチクリックイベント
  if (singleSwitch) {
    singleSwitch.addEventListener('click', () => {
      singleSwitchOn = !singleSwitchOn;
      updateSingleSwitchState();
    });
  }
  
  // 3路スイッチクリックイベント
  if (threeWaySwitch1) {
    threeWaySwitch1.addEventListener('click', () => {
      threeWaySwitch1On = !threeWaySwitch1On;
      updateThreeWaySwitchState();
    });
  }
  
  if (threeWaySwitch2) {
    threeWaySwitch2.addEventListener('click', () => {
      threeWaySwitch2On = !threeWaySwitch2On;
      updateThreeWaySwitchState();
    });
  }
  
  // 4路スイッチクリックイベント
  if (fourWaySwitch1) {
    fourWaySwitch1.addEventListener('click', () => {
      fourWaySwitch1On = !fourWaySwitch1On;
      updateFourWaySwitchState();
    });
  }
  
  if (fourWayMiddleSwitch) {
    fourWayMiddleSwitch.addEventListener('click', () => {
      fourWayMiddleSwitchOn = !fourWayMiddleSwitchOn;
      updateFourWaySwitchState();
    });
  }
  
  if (fourWaySwitch2) {
    fourWaySwitch2.addEventListener('click', () => {
      fourWaySwitch2On = !fourWaySwitch2On;
      updateFourWaySwitchState();
    });
  }
  
  // シングルスイッチの状態更新
  function updateSingleSwitchState() {
    if (singleSwitchOn) {
      // ON状態の場合
      singleSwitchLine.setAttribute('x1', '220');
      singleSwitchLine.setAttribute('y1', '150');
      singleSwitchLine.setAttribute('x2', '280');
      singleSwitchLine.setAttribute('y2', '150');
      singleSwitchLamp.setAttribute('fill', '#FFD700');
      singleSwitchStatus.textContent = 'ON';
      singleSwitchStatus.classList.add('on');
      singleSwitchCurrent.style.opacity = '1';
      
      // 電流値を直接更新
      var currentMeter = document.getElementById('singleSwitchCurrent');
      if (currentMeter) currentMeter.textContent = '0.6 A';
      
      // セレクタで特定して更新
      var meterElements = document.querySelectorAll('.meter-value');
      meterElements.forEach(function(element) {
        if (element.id === 'singleSwitchCurrent') {
          element.textContent = '0.6 A';
        }
      });
      
      // 他のメーター値の更新
      singleSwitchVoltage.textContent = '100 V';
      singleSwitchPower.textContent = '60 W';
    } else {
      // OFF状態の場合
      singleSwitchLine.setAttribute('x1', '220');
      singleSwitchLine.setAttribute('y1', '150');
      singleSwitchLine.setAttribute('x2', '280');
      singleSwitchLine.setAttribute('y2', '130');
      singleSwitchLamp.setAttribute('fill', '#f0f0f0');
      singleSwitchStatus.textContent = 'OFF';
      singleSwitchStatus.classList.remove('on');
      singleSwitchCurrent.style.opacity = '0';
      
      // 電流値を直接更新
      var currentMeter = document.getElementById('singleSwitchCurrent');
      if (currentMeter) currentMeter.textContent = '0.0 A';
      
      // セレクタで特定して更新
      var meterElements = document.querySelectorAll('.meter-value');
      meterElements.forEach(function(element) {
        if (element.id === 'singleSwitchCurrent') {
          element.textContent = '0.0 A';
        }
      });
      
      // 他のメーター値の更新
      singleSwitchVoltage.textContent = '0 V';
      singleSwitchPower.textContent = '0 W';
    }
  }
  
  // 3路スイッチの状態更新
  function updateThreeWaySwitchState() {
    // 正しい3路スイッチのロジック：両方が同じ赤線に接続されているとき回路が完成
    const circuitComplete = (threeWaySwitch1On === threeWaySwitch2On);
    
    // スイッチ1の位置更新
    if (threeWaySwitch1On) {
      threeWaySwitch1Line.setAttribute('x1', '170');
      threeWaySwitch1Line.setAttribute('y1', '150');
      threeWaySwitch1Line.setAttribute('x2', '200');
      threeWaySwitch1Line.setAttribute('y2', '160');
    } else {
      threeWaySwitch1Line.setAttribute('x1', '170');
      threeWaySwitch1Line.setAttribute('y1', '150');
      threeWaySwitch1Line.setAttribute('x2', '200');
      threeWaySwitch1Line.setAttribute('y2', '140');
    }
    
    // スイッチ2の位置更新
    if (threeWaySwitch2On) {
      threeWaySwitch2Line.setAttribute('x1', '390');
      threeWaySwitch2Line.setAttribute('y1', '160');
      threeWaySwitch2Line.setAttribute('x2', '440');
      threeWaySwitch2Line.setAttribute('y2', '150');
    } else {
      threeWaySwitch2Line.setAttribute('x1', '390');
      threeWaySwitch2Line.setAttribute('y1', '140');
      threeWaySwitch2Line.setAttribute('x2', '440');
      threeWaySwitch2Line.setAttribute('y2', '150');
    }
    
    // 回路状態の更新
    if (circuitComplete) {
      // 回路が完成している場合
      threeWaySwitchLamp.setAttribute('fill', '#FFD700');
      threeWaySwitchStatus.textContent = 'ON';
      threeWaySwitchStatus.classList.add('on');
      
      // 電流経路の更新
      let pathData = "";
      
      if (threeWaySwitch1On && threeWaySwitch2On) {
        // 両方のスイッチがON（下側赤線）の場合
        pathData = "M 80 150 L 170 150 L 200 160 L 390 160 L 440 150 L 460 150 L 650 150 L 650 120 L 650 100 L 650 50 L 80 50";
      } else {
        // 両方のスイッチがOFF（上側赤線）の場合
        pathData = "M 80 150 L 170 150 L 200 140 L 390 140 L 440 150 L 460 150 L 650 150 L 650 120 L 650 100 L 650 50 L 80 50";
      }
      
      threeWaySwitchCurrent.setAttribute('d', pathData);
      threeWaySwitchCurrent.style.opacity = '1';
      
      // メーター値の更新
      threeWaySwitchVoltage.textContent = '100 V';
      threeWaySwitchCurrentValue.textContent = '0.6 A';
      threeWaySwitchPower.textContent = '60 W';
    } else {
      // 回路が切断されている場合
      threeWaySwitchLamp.setAttribute('fill', '#f0f0f0');
      threeWaySwitchStatus.textContent = 'OFF';
      threeWaySwitchStatus.classList.remove('on');
      threeWaySwitchCurrent.style.opacity = '0';
      
      // メーター値の更新
      threeWaySwitchVoltage.textContent = '0 V';
      threeWaySwitchCurrentValue.textContent = '0.0 A';
      threeWaySwitchPower.textContent = '0 W';
    }
  }
  
  // 4路スイッチの状態更新
  function updateFourWaySwitchState() {
    // 4路スイッチは、3路スイッチと4路スイッチのON/OFF状態によって動作
    const switchCount = (fourWaySwitch1On ? 1 : 0) + (fourWayMiddleSwitchOn ? 1 : 0) + (fourWaySwitch2On ? 1 : 0);
    const circuitComplete = switchCount % 2 === 1;
    
    // スイッチ1の位置更新
    if (fourWaySwitch1On) {
      fourWaySwitch1Line.setAttribute('x1', '135');
      fourWaySwitch1Line.setAttribute('y1', '170');
      fourWaySwitch1Line.setAttribute('x2', '165');
      fourWaySwitch1Line.setAttribute('y2', '180');
    } else {
      fourWaySwitch1Line.setAttribute('x1', '135');
      fourWaySwitch1Line.setAttribute('y1', '170');
      fourWaySwitch1Line.setAttribute('x2', '165');
      fourWaySwitch1Line.setAttribute('y2', '160');
    }
    
    // 4路スイッチの位置更新
    if (fourWayMiddleSwitchOn) {
      // 平行接続
      fourWayMiddleSwitch1.setAttribute('x1', '250');
      fourWayMiddleSwitch1.setAttribute('y1', '160');
      fourWayMiddleSwitch1.setAttribute('x2', '350');
      fourWayMiddleSwitch1.setAttribute('y2', '160');
      
      fourWayMiddleSwitch2.setAttribute('x1', '250');
      fourWayMiddleSwitch2.setAttribute('y1', '180');
      fourWayMiddleSwitch2.setAttribute('x2', '350');
      fourWayMiddleSwitch2.setAttribute('y2', '180');
    } else {
      // 交差接続
      fourWayMiddleSwitch1.setAttribute('x1', '250');
      fourWayMiddleSwitch1.setAttribute('y1', '160');
      fourWayMiddleSwitch1.setAttribute('x2', '350');
      fourWayMiddleSwitch1.setAttribute('y2', '180');
      
      fourWayMiddleSwitch2.setAttribute('x1', '250');
      fourWayMiddleSwitch2.setAttribute('y1', '180');
      fourWayMiddleSwitch2.setAttribute('x2', '350');
      fourWayMiddleSwitch2.setAttribute('y2', '160');
    }
    
    // スイッチ2の位置更新
    if (fourWaySwitch2On) {
      fourWaySwitch2Line.setAttribute('x1', '435');
      fourWaySwitch2Line.setAttribute('y1', '180');
      fourWaySwitch2Line.setAttribute('x2', '475');
      fourWaySwitch2Line.setAttribute('y2', '170');
    } else {
      fourWaySwitch2Line.setAttribute('x1', '435');
      fourWaySwitch2Line.setAttribute('y1', '160');
      fourWaySwitch2Line.setAttribute('x2', '475');
      fourWaySwitch2Line.setAttribute('y2', '170');
    }
    
    // 回路状態の更新
    if (circuitComplete) {
      fourWaySwitchLamp.setAttribute('fill', '#FFD700');
      fourWaySwitchStatus.textContent = 'ON';
      fourWaySwitchStatus.classList.add('on');
      
      // 電流経路の更新
      let pathData = "";
      
      // スイッチ1の経路から始める
      pathData = "M 70 170 L 135 170";
      
      // スイッチ1からの経路
      if (fourWaySwitch1On) {
        pathData += " L 165 180 ";
      } else {
        pathData += " L 165 160 ";
      }
      
      // 4路スイッチの経路
      if (fourWayMiddleSwitchOn) {
        if (fourWaySwitch1On) {
          pathData += "L 250 180 L 350 180 ";
        } else {
          pathData += "L 250 160 L 350 160 ";
        }
      } else {
        if (fourWaySwitch1On) {
          pathData += "L 250 180 L 350 160 ";
        } else {
          pathData += "L 250 160 L 350 180 ";
        }
      }
      
      // スイッチ2の経路
      pathData += "L 435 ";
      if (fourWaySwitch2On) {
        pathData += "180 ";
      } else {
        pathData += "160 ";
      }
      
      // 照明を通って白線に流れる
      pathData += "L 475 170 L 495 170 L 730 170 L 730 120 L 730 100 L 730 50 L 70 50";
      
      fourWaySwitchCurrent.setAttribute('d', pathData);
      fourWaySwitchCurrent.style.opacity = '1';
      
      // メーター値の更新
      fourWaySwitchVoltage.textContent = '100 V';
      fourWaySwitchCurrentValue.textContent = '0.6 A';
      fourWaySwitchPower.textContent = '60 W';
    } else {
      fourWaySwitchLamp.setAttribute('fill', '#f0f0f0');
      fourWaySwitchStatus.textContent = 'OFF';
      fourWaySwitchStatus.classList.remove('on');
      fourWaySwitchCurrent.style.opacity = '0';
      
      // メーター値の更新
      fourWaySwitchVoltage.textContent = '0 V';
      fourWaySwitchCurrentValue.textContent = '0.0 A';
      fourWaySwitchPower.textContent = '0 W';
    }
  }
  
  // コンセント回路の要素取得
  const disconnectedPlug = document.getElementById('disconnectedPlug');
  const pluggedOutlet = document.getElementById('pluggedOutlet');
  const emptySocket = document.getElementById('emptySocket');
  const battery = document.getElementById('battery');
  const batteryLevel = document.getElementById('batteryLevel');
  const chargingSymbol = document.getElementById('chargingSymbol');
  const chargingStatus = document.getElementById('chargingStatus');
  const current = document.getElementById('current');
  const toggleButton = document.getElementById('toggleButton');
  const resetChargingButton = document.getElementById('resetChargingButton');
  const outletVoltage = document.getElementById('outletVoltage');
  const outletCurrent = document.getElementById('outletCurrent');
  const chargingState = document.getElementById('chargingState');
  
  // 状態変数
  let plugConnected = false;
  let chargingLevel = 30; // 初期充電量（%）
  let chargingInterval;
  
  // プラグクリックイベント
  if (disconnectedPlug) {
    disconnectedPlug.addEventListener('click', toggleConnection);
  }
  
  if (toggleButton) {
    toggleButton.addEventListener('click', toggleConnection);
  }
  
  // 充電状態リセットボタン
  if (resetChargingButton) {
    resetChargingButton.addEventListener('click', resetCharging);
  }
  
  // 接続状態切り替え
  function toggleConnection() {
    plugConnected = !plugConnected;
    updateState();
    
    // 充電開始・停止の処理
    if (plugConnected) {
      startCharging();
      outletCurrent.textContent = '1.5 A';
    } else {
      stopCharging();
    }
  }
  
  // 充電状態リセット
  function resetCharging() {
    // 一旦充電を停止
    stopCharging();
    
    // 充電レベルを初期値に戻す
    chargingLevel = 30;
    updateBatteryLevel();
    
    // 接続中の場合は充電を再開
    if (plugConnected) {
      // 重要：電流値を先に設定してから充電開始
      outletCurrent.textContent = '1.5 A';
      startCharging();
    }
  }
  
  // 状態更新
  function updateState() {
    if (plugConnected) {
      // 接続状態
      disconnectedPlug.style.display = 'none';
      pluggedOutlet.style.display = 'block';
      emptySocket.style.display = 'none';
      chargingStatus.textContent = '充電中';
      chargingStatus.classList.add('on');
      current.style.opacity = '1';
      chargingSymbol.setAttribute('opacity', '1');
      
      // メーター値の更新
      outletVoltage.textContent = '100 V';
      outletCurrent.textContent = '1.5 A';
    } else {
      // 切断状態
      disconnectedPlug.style.display = 'block';
      pluggedOutlet.style.display = 'none';
      emptySocket.style.display = 'block';
      chargingStatus.textContent = '切断';
      chargingStatus.classList.remove('on');
      current.style.opacity = '0';
      chargingSymbol.setAttribute('opacity', '0');
      
      // メーター値の更新
      outletVoltage.textContent = '0 V';
      outletCurrent.textContent = '0.0 A';
    }
    
    // バッテリーレベルの表示更新
    updateBatteryLevel();
  }
  
  // バッテリー充電開始
  function startCharging() {
    chargingInterval = setInterval(() => {
      if (chargingLevel < 100) {
        chargingLevel += 1;
        updateBatteryLevel();
      } else {
        // 満充電になったら充電を停止
        clearInterval(chargingInterval);
        outletCurrent.textContent = '0.1 A'; // 満充電時は微小電流
      }
    }, 100); // 0.1秒ごとに1%増加
  }
  
  // バッテリー充電停止
  function stopCharging() {
    clearInterval(chargingInterval);
  }
  
  // バッテリーレベルの表示更新
  function updateBatteryLevel() {
    // バッテリーレベルに応じて黒い部分の幅を変更
    const width = (chargingLevel / 100) * 100; // 最大幅は100
    batteryLevel.setAttribute('width', width);
    
    // 充電状態の更新
    chargingState.textContent = chargingLevel + '%';
  }
  
  // デフォルト状態の設定
  singleSwitchOn = false;
  threeWaySwitch1On = false;
  threeWaySwitch2On = true;
  fourWaySwitch1On = false;
  fourWayMiddleSwitchOn = false;
  fourWaySwitch2On = false;
  plugConnected = false;
  
  // 初期状態の更新
  if (singleSwitch) updateSingleSwitchState();
  if (threeWaySwitch1 && threeWaySwitch2) updateThreeWaySwitchState();
  if (fourWaySwitch1 && fourWayMiddleSwitch && fourWaySwitch2) updateFourWaySwitchState();
  if (disconnectedPlug && pluggedOutlet) updateState();
});        // 回路データ
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
