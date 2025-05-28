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
});