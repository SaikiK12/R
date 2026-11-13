/* ================= 1. РАБОТА С КУКАМИ И ХРАНИЛИЩЕМ ================= */
        function setCookie(name, value, days = 365) {
            const date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            document.cookie = `${name}=${encodeURIComponent(value)};expires=${date.toUTCString()};path=/;SameSite=Lax`;
            try { localStorage.setItem(name, value); } catch(e) {}
        }

        function getCookie(name) {
            const nameEQ = name + "=";
            const ca = document.cookie.split(';');
            for(let i = 0; i < ca.length; i++) {
                let c = ca[i].trim();
                if (c.indexOf(nameEQ) === 0) return decodeURIComponent(c.substring(nameEQ.length));
            }
            try { return localStorage.getItem(name); } catch(e) { return null; }
        }

        /* ================= 2. ЧАСТИЦЫ ФОНА ================= */
        const bgCanvas = document.getElementById('bg-canvas');
        const bgCtx = bgCanvas.getContext('2d');
        let particles = [];

        function initBgCanvas() {
            bgCanvas.width = window.innerWidth;
            bgCanvas.height = window.innerHeight;
            particles = [];
            const count = window.innerWidth < 768 ? 24 : 40;
            for (let i = 0; i < count; i++) {
                particles.push({
                    x: Math.random() * bgCanvas.width,
                    y: Math.random() * bgCanvas.height,
                    radius: Math.random() * 1.5 + 1.0,
                    alpha: Math.random() * 0.4 + 0.15,
                    vx: (Math.random() - 0.5) * 0.15,
                    vy: -(Math.random() * 0.4 + 0.2)
                });
            }
        }
        window.addEventListener('resize', initBgCanvas);
        initBgCanvas();

        function drawParticles() {
            bgCtx.clearRect(0, 0, bgCanvas.width, bgCanvas.height);
            for (let p of particles) {
                p.x += p.vx;
                p.y += p.vy;

                if (p.y < 0) {
                    p.y = bgCanvas.height;
                    p.x = Math.random() * bgCanvas.width;
                }
                if (p.x < 0) p.x = bgCanvas.width;
                if (p.x > bgCanvas.width) p.x = 0;

                bgCtx.beginPath();
                bgCtx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                bgCtx.fillStyle = `rgba(180, 160, 255, ${p.alpha})`;
                bgCtx.fill();
            }
            requestAnimationFrame(drawParticles);
        }
        drawParticles();

        /* ================= 3. БОЛЬШОЙ МАССИВ LIVE FEED НА 5 МИНУТ ================= */
        const baseAddresses = [
            "0x7C3...D61", "0xA64...7B9", "0x2E7...F14", "0x9B2...3C0", "0xD51...A27",
            "0x4FA...9E3", "0x11B...E92", "0x89C...42D", "0x3F4...B5A", "0x6A1...77F",
            "0xBC4...80A", "0x44D...11E", "0x98A...25F", "0x32E...D04", "0x77B...9A1",
            "0xF01...42C", "0x63A...58D", "0x19E...38B", "0x54F...A11", "0xCC2...9F4",
            "0x02D...6B8", "0x88E...13C", "0x74A...E90", "0x29C...F77", "0x5B8...A23",
            "0x91F...31C", "0x33A...89D", "0x15D...40B", "0x67E...92A", "0x40C...F55",
            "0x81B...7C2", "0x23D...99E", "0x59A...64B", "0x0EF...38A", "0x94C...17D",
            "0x38F...B21", "0x71A...44E", "0x19B...90C", "0x65C...88F", "0x28E...A09",
            "0x8FD...33B", "0x47B...61E", "0x90A...D24", "0x13C...79A", "0x52E...F18",
            "0x39B...80C", "0x78D...12F", "0x24A...9B3", "0x69E...55D", "0x0AC...74E"
        ];

        const diceCombinations = [
            "1 SOL + 25 USDT", "2 SOL + 50 USDT", "3 SOL + 100 USDT", "5 SOL + 150 USDT", "6 SOL + 200 USDT",
            "7 SOL + 300 USDT", "3 SOL + 25 USDT", "1 SOL + 100 USDT", "5 SOL + 50 USDT", "2 SOL + 200 USDT",
            "6 SOL + 150 USDT", "7 SOL + 100 USDT", "3 SOL + 300 USDT", "1 SOL + 50 USDT", "5 SOL + 25 USDT",
            "2 SOL + 150 USDT", "6 SOL + 100 USDT", "7 SOL + 200 USDT", "3 SOL + 50 USDT", "1 SOL + 200 USDT",
            "5 SOL + 100 USDT", "2 SOL + 25 USDT", "6 SOL + 300 USDT", "7 SOL + 50 USDT", "3 SOL + 150 USDT",
            "1 SOL + 25 USDT", "5 SOL + 300 USDT", "2 SOL + 100 USDT", "6 SOL + 50 USDT", "7 SOL + 150 USDT",
            "3 SOL + 200 USDT", "1 SOL + 150 USDT", "5 SOL + 200 USDT", "2 SOL + 300 USDT", "6 SOL + 25 USDT",
            "7 SOL + 25 USDT", "3 SOL + 100 USDT", "1 SOL + 300 USDT", "5 SOL + 50 USDT", "2 SOL + 50 USDT",
            "6 SOL + 200 USDT", "7 SOL + 100 USDT", "3 SOL + 25 USDT", "1 SOL + 100 USDT", "5 SOL + 150 USDT",
            "2 SOL + 200 USDT", "6 SOL + 150 USDT", "7 SOL + 300 USDT", "3 SOL + 300 USDT", "1 SOL + 50 USDT"
        ];

        const fullFeedData = baseAddresses.map((addr, idx) => ({
            w: addr,
            val: diceCombinations[idx % diceCombinations.length]
        }));

        function initTicker() {
            const track = document.getElementById('ticker-content');
            const combined = [...fullFeedData, ...fullFeedData];
            track.innerHTML = combined.map(item => `
                <div class="ticker-pill">
                    <span class="ticker-bullet"></span>
                    <span class="ticker-address">${item.w}</span>
                    <span class="ticker-value">${item.val}</span>
                </div>
            `).join('');
        }
        initTicker();

        /* ================= 4. УПРАВЛЕНИЕ И ЛОГИКА ================= */
        function scrollToArena() {
            document.getElementById('arena').scrollIntoView({ behavior: 'smooth' });
        }

        function closeRewardModal() {
            const modal = document.getElementById('reward-modal');
            modal.classList.remove('active');
        }

        function openRewardModal() {
            const modal = document.getElementById('reward-modal');
            modal.classList.add('active');
        }

        function openModal() {
            console.log("Connect wallet clicked");
        }

        /* ================= 5. ТЕКСТУРЫ КУБИКОВ ================= */
        const SOL_FACES = [
            { text: "+1 SOL" },  // 0
            { text: "+2 SOL" },  // 1
            { text: "+3 SOL" },  // 2
            { text: "+5 SOL" },  // 3
            { text: "+6 SOL" },  // 4 (+6 SOL)
            { text: "+7 SOL" }   // 5
        ];

        const USDT_FACES = [
            { text: "+25 USDT" },  // 0
            { text: "+50 USDT" },  // 1
            { text: "+100 USDT" }, // 2
            { text: "+150 USDT" }, // 3
            { text: "+200 USDT" }, // 4 (+200 USDT)
            { text: "+300 USDT" }  // 5
        ];

        const FACE_ALIGNMENT_ROTATIONS = [
            { x: 0, y: -Math.PI / 2, z: 0 },
            { x: 0, y: Math.PI / 2, z: 0 },
            { x: Math.PI / 2, y: 0, z: 0 },
            { x: -Math.PI / 2, y: 0, z: 0 },
            { x: 0, y: 0, z: 0 },
            { x: 0, y: Math.PI, z: 0 }
        ];

        function createSolanaFaceTexture(valueText) {
            const S = 1024;
            const canvas = document.createElement('canvas');
            canvas.width = S;
            canvas.height = S;
            const ctx = canvas.getContext('2d');

            ctx.fillStyle = '#08080a';
            ctx.fillRect(0, 0, S, S);

            ctx.strokeStyle = '#141418';
            ctx.lineWidth = 10;
            ctx.strokeRect(10, 10, S - 20, S - 20);

            ctx.save();
            ctx.translate(S / 2, S / 2 - 70);

            const barW = 580;
            const barH = 105;
            const slant = 105;
            const gap = 32;
            const cornerRadius = 14;

            const grad = ctx.createLinearGradient(-barW / 2, 0, barW / 2, 0);
            grad.addColorStop(0.0, '#14F195');
            grad.addColorStop(0.5, '#00D2FF');
            grad.addColorStop(1.0, '#9945FF');
            ctx.fillStyle = grad;

            function drawParallelogram(yOffset, dir) {
                const halfW = barW / 2;
                const halfH = barH / 2;
                const topY = yOffset - halfH;
                const botY = yOffset + halfH;
                let p0, p1, p2, p3;
                if (dir === 1) {
                    p0 = { x: -halfW + slant, y: topY };
                    p1 = { x: halfW, y: topY };
                    p2 = { x: halfW - slant, y: botY };
                    p3 = { x: -halfW, y: botY };
                } else {
                    p0 = { x: -halfW, y: topY };
                    p1 = { x: halfW - slant, y: topY };
                    p2 = { x: halfW, y: botY };
                    p3 = { x: -halfW + slant, y: botY };
                }
                ctx.beginPath();
                ctx.moveTo((p0.x + p1.x) / 2, topY);
                ctx.arcTo(p1.x, p1.y, p2.x, p2.y, cornerRadius);
                ctx.arcTo(p2.x, p2.y, p3.x, p3.y, cornerRadius);
                ctx.arcTo(p3.x, p3.y, p0.x, p0.y, cornerRadius);
                ctx.arcTo(p0.x, p0.y, p1.x, p1.y, cornerRadius);
                ctx.closePath();
                ctx.fill();
            }

            drawParallelogram(-(barH + gap), 1);
            drawParallelogram(0, -1);
            drawParallelogram(barH + gap, 1);
            ctx.restore();

            ctx.save();
            ctx.fillStyle = '#FFFFFF';
            ctx.font = '700 86px "Fira Code", monospace';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(valueText, S / 2, S / 2 + 280);
            ctx.restore();

            const texture = new THREE.CanvasTexture(canvas);
            texture.generateMipmaps = true;
            texture.minFilter = THREE.LinearMipmapLinearFilter;
            return texture;
        }

        function createUsdtFaceTexture(valueText) {
            const S = 1024;
            const canvas = document.createElement('canvas');
            canvas.width = S;
            canvas.height = S;
            const ctx = canvas.getContext('2d');

            ctx.fillStyle = '#08080a';
            ctx.fillRect(0, 0, S, S);

            ctx.strokeStyle = '#141418';
            ctx.lineWidth = 10;
            ctx.strokeRect(10, 10, S - 20, S - 20);

            ctx.save();
            ctx.translate(S / 2, 380);
            ctx.scale(0.55, 0.55);

            const shieldPath = new Path2D();
            shieldPath.moveTo(-255, -430);
            shieldPath.lineTo(255, -430);
            shieldPath.lineTo(470, -70);
            shieldPath.lineTo(0, 480);
            shieldPath.lineTo(-470, -70);
            shieldPath.closePath();
            ctx.fillStyle = '#26A17B';
            ctx.fill(shieldPath);

            ctx.beginPath();
            ctx.ellipse(0, -40, 295, 75, 0, 0, Math.PI * 2);
            ctx.strokeStyle = '#FFFFFF';
            ctx.lineWidth = 32;
            ctx.stroke();

            ctx.fillStyle = '#FFFFFF';
            ctx.fillRect(-225, -315, 450, 115);
            ctx.fillRect(-60, -200, 120, 490);

            ctx.beginPath();
            ctx.ellipse(0, -40, 295, 75, 0, 0.15, Math.PI - 0.15);
            ctx.strokeStyle = '#FFFFFF';
            ctx.lineWidth = 32;
            ctx.stroke();
            ctx.restore();

            ctx.save();
            ctx.fillStyle = '#FFFFFF';
            ctx.font = '700 82px "Fira Code", monospace';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(valueText, S / 2, 800);
            ctx.restore();

            const texture = new THREE.CanvasTexture(canvas);
            texture.generateMipmaps = true;
            texture.minFilter = THREE.LinearMipmapLinearFilter;
            return texture;
        }

        /* ================= 6. THREE.JS СЦЕНА ================= */
        let scene, camera, renderer, controls;
        let solanaCube, usdtCube;
        let isRolling = false;
        let hasRolled = false;
        let rollStartTime = 0;
        const rollDuration = 3900;

        let solRollAnimation = null;
        let usdtRollAnimation = null;

        // Фиксированные цели: +6 SOL (индекс 4) и +200 USDT (индекс 4)
        const TARGET_SOL_INDEX = 4;
        const TARGET_USDT_INDEX = 4;

        function initThreeScene() {
            const container = document.querySelector('.arena-canvas-container');
            const canvas = document.getElementById('webgl-canvas');

            scene = new THREE.Scene();
            scene.background = new THREE.Color(0x09080e);

            const isMobile = window.innerWidth < 860;
            camera = new THREE.PerspectiveCamera(38, container.clientWidth / container.clientHeight, 0.1, 100);
            camera.position.set(0, 0, isMobile ? 11.2 : 7.6);

            renderer = new THREE.WebGLRenderer({
                canvas: canvas,
                antialias: true,
                powerPreference: "high-performance"
            });
            renderer.setSize(container.clientWidth, container.clientHeight);
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
            renderer.toneMapping = THREE.ACESFilmicToneMapping;
            renderer.toneMappingExposure = 1.1;

            controls = new THREE.OrbitControls(camera, renderer.domElement);
            controls.enableDamping = true;
            controls.dampingFactor = 0.05;
            controls.target.set(0, 0, 0);

            controls.enableZoom = false;

            controls.maxDistance = 14;
            controls.minDistance = 4;
            controls.enablePan = false;

            const ambient = new THREE.AmbientLight(0xffffff, 1.15);
            scene.add(ambient);

            const key = new THREE.DirectionalLight(0xffffff, 1.25);
            key.position.set(6, 8, 7);
            scene.add(key);

            const purpleRim = new THREE.DirectionalLight(0x9945ff, 1.5);
            purpleRim.position.set(-8, -4, -4);
            scene.add(purpleRim);

            const solMaterials = SOL_FACES.map(f => new THREE.MeshPhysicalMaterial({
                map: createSolanaFaceTexture(f.text),
                roughness: 0.28,
                metalness: 0.08,
                clearcoat: 0.15
            }));

            const usdtMaterials = USDT_FACES.map(f => new THREE.MeshPhysicalMaterial({
                map: createUsdtFaceTexture(f.text),
                roughness: 0.3,
                metalness: 0.08,
                clearcoat: 0.15
            }));

            const cubeGeo = new THREE.BoxGeometry(2.1, 2.1, 2.1);
            solanaCube = new THREE.Mesh(cubeGeo, solMaterials);
            usdtCube = new THREE.Mesh(cubeGeo, usdtMaterials);

            const spacing = isMobile ? 1.55 : 1.85;
            solanaCube.position.set(-spacing, 0, 0);
            usdtCube.position.set(spacing, 0, 0);

            scene.add(solanaCube);
            scene.add(usdtCube);

            checkSavedRollState();

            animateThree();
        }

        function checkSavedRollState() {
            const savedState = getCookie('rolldice_has_rolled');
            if (savedState === 'true') {
                hasRolled = true;

                // Устанавливаем грани +6 SOL и +200 USDT
                const solRot = FACE_ALIGNMENT_ROTATIONS[TARGET_SOL_INDEX];
                const usdtRot = FACE_ALIGNMENT_ROTATIONS[TARGET_USDT_INDEX];
                solanaCube.rotation.set(solRot.x, solRot.y, solRot.z);
                usdtCube.rotation.set(usdtRot.x, usdtRot.y, usdtRot.z);

                // Очищаем старые 3 SOL если они были в куках
                let savedSol = getCookie('rolldice_sol_win');
                if (!savedSol || savedSol.includes('3')) {
                    savedSol = "6 SOL";
                    setCookie('rolldice_sol_win', savedSol, 365);
                }
                const savedUsdt = getCookie('rolldice_usdt_win') || "200 USDT";

                document.getElementById('win-sol-val').innerText = savedSol;
                document.getElementById('win-usdt-val').innerText = savedUsdt;

                const rollBtn = document.getElementById('roll-btn');
                if (rollBtn) {
                    rollBtn.disabled = false;
                    rollBtn.innerText = "CLAIM BOTH REWARDS";
                    rollBtn.onclick = openRewardModal;
                }
            }
        }

        const clock = new THREE.Clock();

        function animateThree() {
            requestAnimationFrame(animateThree);
            const time = clock.getElapsedTime();

            if (!isRolling && !hasRolled) {
                solanaCube.position.y = Math.sin(time * 1.3) * 0.05;
                usdtCube.position.y = Math.cos(time * 1.3) * 0.05;
                solanaCube.rotation.y += 0.003;
                usdtCube.rotation.y += 0.003;
            } else if (isRolling) {
                const now = performance.now();
                const progress = Math.min((now - rollStartTime) / rollDuration, 1.0);
                const easeOut = 1 - Math.pow(1 - progress, 5);

                if (solRollAnimation) {
                    solanaCube.rotation.x = solRollAnimation.startX + (solRollAnimation.targetX - solRollAnimation.startX) * easeOut;
                    solanaCube.rotation.y = solRollAnimation.startY + (solRollAnimation.targetY - solRollAnimation.startY) * easeOut;
                    solanaCube.rotation.z = solRollAnimation.startZ + (solRollAnimation.targetZ - solRollAnimation.startZ) * easeOut;
                    solanaCube.position.y = Math.sin(progress * Math.PI) * 0.55;
                }

                if (usdtRollAnimation) {
                    usdtCube.rotation.x = usdtRollAnimation.startX + (usdtRollAnimation.targetX - usdtRollAnimation.startX) * easeOut;
                    usdtCube.rotation.y = usdtRollAnimation.startY + (usdtRollAnimation.targetY - usdtRollAnimation.startY) * easeOut;
                    usdtCube.rotation.z = usdtRollAnimation.startZ + (usdtRollAnimation.targetZ - usdtRollAnimation.startZ) * easeOut;
                    usdtCube.position.y = Math.sin(progress * Math.PI) * 0.55;
                }

                if (progress >= 1.0) {
                    finalizeRoll();
                }
            }

            controls.update();
            renderer.render(scene, camera);
        }

        /* ================= 7. БРОСОК ================= */
        let finalSolReward = "6 SOL";
        let finalUsdtReward = "200 USDT";
        let targetSolRot = null;
        let targetUsdtRot = null;

        function executeRoll() {
            if (isRolling) return;

            if (hasRolled) {
                openRewardModal();
                return;
            }

            isRolling = true;

            const rollBtn = document.getElementById('roll-btn');
            rollBtn.disabled = true;
            rollBtn.innerText = "ROLLING...";

            finalSolReward = SOL_FACES[TARGET_SOL_INDEX].text.replace('+', '');
            finalUsdtReward = USDT_FACES[TARGET_USDT_INDEX].text.replace('+', '');

            targetSolRot = FACE_ALIGNMENT_ROTATIONS[TARGET_SOL_INDEX];
            targetUsdtRot = FACE_ALIGNMENT_ROTATIONS[TARGET_USDT_INDEX];

            const extraSpins = Math.PI * 12;

            solRollAnimation = {
                startX: solanaCube.rotation.x,
                startY: solanaCube.rotation.y,
                startZ: solanaCube.rotation.z,
                targetX: targetSolRot.x + extraSpins,
                targetY: targetSolRot.y + extraSpins,
                targetZ: targetSolRot.z
            };

            usdtRollAnimation = {
                startX: usdtCube.rotation.x,
                startY: usdtCube.rotation.y,
                startZ: usdtCube.rotation.z,
                targetX: targetUsdtRot.x + extraSpins,
                targetY: targetUsdtRot.y + extraSpins + Math.PI * 2,
                targetZ: targetUsdtRot.z
            };

            rollStartTime = performance.now();
        }

        function finalizeRoll() {
            isRolling = false;
            hasRolled = true;

            setCookie('rolldice_has_rolled', 'true', 365);
            setCookie('rolldice_sol_win', finalSolReward, 365);
            setCookie('rolldice_usdt_win', finalUsdtReward, 365);

            solanaCube.rotation.set(targetSolRot.x, targetSolRot.y, targetSolRot.z);
            usdtCube.rotation.set(targetUsdtRot.x, targetUsdtRot.y, targetUsdtRot.z);
            solanaCube.position.y = 0;
            usdtCube.position.y = 0;

            const rollBtn = document.getElementById('roll-btn');
            rollBtn.disabled = false;
            rollBtn.innerText = "CLAIM BOTH REWARDS";
            rollBtn.onclick = openRewardModal;

            confetti({
                particleCount: 85,
                spread: 75,
                origin: { y: 0.6 },
                colors: ['#9945FF', '#14F195', '#26A17B', '#FFFFFF', '#D8C2FF']
            });

            document.getElementById('win-sol-val').innerText = finalSolReward;
            document.getElementById('win-usdt-val').innerText = finalUsdtReward;

            openRewardModal();
        }

        function handleResize() {
            if (!renderer || !camera) return;
            const container = document.querySelector('.arena-canvas-container');
            const isMobile = window.innerWidth < 860;

            camera.aspect = container.clientWidth / container.clientHeight;
            camera.position.z = isMobile ? 11.2 : 7.6;
            camera.updateProjectionMatrix();

            const spacing = isMobile ? 1.55 : 1.85;
            if (solanaCube && usdtCube) {
                solanaCube.position.x = -spacing;
                usdtCube.position.x = spacing;
            }

            renderer.setSize(container.clientWidth, container.clientHeight);
        }

        window.addEventListener('resize', handleResize);
        window.onload = initThreeScene;