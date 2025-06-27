// 電気設計シミュレーター共通JavaScript

// ページ読み込み時のアニメーション
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.simulator-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        setTimeout(() => {
            card.style.opacity = '1';
        }, index * 100);
    });
    
    // ウィンドウサイズに応じた調整を実行
    adjustScale();
});

// ウィンドウサイズに応じた調整
function adjustScale() {
    const viewportWidth = window.innerWidth;
    
    if (viewportWidth < 768) {
        document.documentElement.style.fontSize = '14px';
    } else if (viewportWidth < 992) {
        document.documentElement.style.fontSize = '15px';
    } else {
        document.documentElement.style.fontSize = '16px';
    }
}

// ウィンドウリサイズ時の調整
window.addEventListener('resize', adjustScale);

// タブ切り替え機能
function switchTab(tabName) {
    // すべてのタブコンテンツを非表示
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });
    
    // すべてのタブボタンから active クラスを削除
    document.querySelectorAll('.tab-button').forEach(button => {
        button.classList.remove('active');
    });
    
    // 選択されたタブを表示
    const targetTab = document.getElementById(`${tabName}-tab`);
    if (targetTab) {
        targetTab.classList.add('active');
    }
    
    // 選択されたボタンに active クラスを追加
    event.target.classList.add('active');
}

// ポータルへ戻るボタン（個別シミュレーター用）
function goToPortal() {
    // 現在のディレクトリレベルを判断してパスを調整
    const currentPath = window.location.pathname;
    let portalPath = 'index.html';
    
    if (currentPath.includes('/simulators/')) {
        portalPath = '../../index.html';
    }
    
    window.location.href = portalPath;
}

// 隠しアクセス機能（開発者向けドキュメント）
let keySequence = [];
const secretCode = ['d', 'o', 'c', 's'];

document.addEventListener('keydown', function(e) {
    keySequence.push(e.key.toLowerCase());
    
    // 最新の4文字を保持
    if (keySequence.length > secretCode.length) {
        keySequence.shift();
    }
    
    // シークレットコードの確認
    if (keySequence.length === secretCode.length && 
        keySequence.every((key, index) => key === secretCode[index])) {
        showDocumentPortal();
        keySequence = []; // リセット
    }
});

function showDocumentPortal() {
    // 既存のポータルを削除
    const existingPortal = document.getElementById('document-portal');
    if (existingPortal) {
        existingPortal.remove();
        return;
    }

    // ドキュメントポータルを作成
    const portal = document.createElement('div');
    portal.id = 'document-portal';
    portal.innerHTML = `
        <div style="
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(135deg, #005BAB, #003d75);
            color: white;
            padding: 2rem;
            border-radius: 15px;
            box-shadow: 0 20px 60px rgba(0,0,0,0.3);
            z-index: 10000;
            text-align: center;
            min-width: 350px;
            animation: documentPortalAppear 0.5s ease-out;
        ">
            <h3 style="margin-bottom: 1.5rem; color: #FF961C;">📚 開発者ドキュメント</h3>
            <p style="margin-bottom: 2rem; opacity: 0.9;">プロジェクトの詳細仕様書へアクセス</p>
            <div style="display: grid; gap: 1rem;">
                <a href="docs/requirements-document.html" style="
                    background: #FF961C;
                    color: white;
                    text-decoration: none;
                    padding: 0.8rem 1.5rem;
                    border-radius: 8px;
                    transition: all 0.3s ease;
                    font-weight: bold;
                " onmouseover="this.style.background='#e67e00'" onmouseout="this.style.background='#FF961C'">
                    📋 要件定義書
                </a>
                <a href="docs/design-specification.html" style="
                    background: #FF961C;
                    color: white;
                    text-decoration: none;
                    padding: 0.8rem 1.5rem;
                    border-radius: 8px;
                    transition: all 0.3s ease;
                    font-weight: bold;
                " onmouseover="this.style.background='#e67e00'" onmouseout="this.style.background='#FF961C'">
                    🛠️ 設計仕様書
                </a>
            </div>
            <button onclick="document.getElementById('document-portal').remove()" style="
                background: transparent;
                border: 2px solid rgba(255,255,255,0.3);
                color: white;
                padding: 0.5rem 1rem;
                border-radius: 20px;
                cursor: pointer;
                margin-top: 1.5rem;
                transition: all 0.3s ease;
            " onmouseover="this.style.background='rgba(255,255,255,0.1)'" onmouseout="this.style.background='transparent'">
                閉じる
            </button>
        </div>
        <div style="
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: rgba(0,0,0,0.5);
            z-index: 9999;
            animation: documentPortalBackdrop 0.5s ease-out;
        " onclick="document.getElementById('document-portal').remove()"></div>
    `;

    document.body.appendChild(portal);
}

// ポータルアニメーションのCSSを動的に追加
if (!document.getElementById('portal-animations')) {
    const style = document.createElement('style');
    style.id = 'portal-animations';
    style.textContent = `
        @keyframes documentPortalAppear {
            from {
                opacity: 0;
                transform: translate(-50%, -60%);
                scale: 0.9;
            }
            to {
                opacity: 1;
                transform: translate(-50%, -50%);
                scale: 1;
            }
        }
        
        @keyframes documentPortalBackdrop {
            from { opacity: 0; }
            to { opacity: 1; }
        }
    `;
    document.head.appendChild(style);
}