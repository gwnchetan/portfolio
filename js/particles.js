/**
 * particles.js
 * GPGPU particle system — reverse engineered from Google Antigravity
 * Depends on: Three.js r128 (loaded before this file)
 *
 * HOW TO USE IN index.html:
 * 1. Add to <head>:
 *    <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
 *
 * 2. Add to <body> before loader div:
 *    <div id="bg-three" style="position:fixed;inset:0;z-index:0;pointer-events:none;"></div>
 *
 * 3. Add before </body>:
 *    <script src="particles.js"></script>
 *
 * 4. In mode toggle onComplete, call:
 *    if (window.particleSetMode) window.particleSetMode(isCyber ? 'cyber' : 'dev');
 */

(function () {

    // ============================================================
    // GUARD — mobile/tablet gets no WebGL
    // ============================================================
    if (window.innerWidth < 1024) {
        const bg = document.getElementById('bg-three');
        if (bg) {
            bg.style.background = [
                'radial-gradient(ellipse at 20% 50%, rgba(255,85,0,0.04) 0%, transparent 55%)',
                'radial-gradient(ellipse at 80% 50%, rgba(255,85,0,0.03) 0%, transparent 55%)'
            ].join(',');
        }
        window.particleSetMode = function () {};
        return;
    }

    // ============================================================
    // CONFIG
    // ============================================================
    const SIM_SIZE          = 96;
    const RING_WIDTH        = 0.02;
    const RING_WIDTH2       = 0.18;
    const RING_DISPLACEMENT = 0.45;
    const PARTICLE_SCALE    = 0.35;
    const RING_RADIUS_MIN   = 0.32;
    const RING_RADIUS_MAX   = 0.72;

    const PALETTES = {
        dev: {
            color1: new THREE.Color(0xff5500),
            color2: new THREE.Color(0xcc2200),
            color3: new THREE.Color(0xff9933),
        },
        cyber: {
            color1: new THREE.Color(0x00ff41),
            color2: new THREE.Color(0x00cc33),
            color3: new THREE.Color(0x33ff88),
        }
    };

    // ============================================================
    // RENDERER SETUP
    // ============================================================
    const container = document.getElementById('bg-three');
    if (!container) { console.warn('particles.js: #bg-three not found'); return; }

    const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: false });
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x0d0d0d, 1);
    container.appendChild(renderer.domElement);

    const floatSupport = renderer.capabilities.isWebGL2
        ? THREE.FloatType
        : THREE.HalfFloatType;

    // ============================================================
    // SIMPLEX NOISE — Ian McEwan / Ashima Arts
    // ============================================================
    const NOISE_GLSL = /* glsl */`
        vec3 _p289v3(vec3 x){return x-floor(x*(1./289.))*289.;}
        vec4 _p289v4(vec4 x){return x-floor(x*(1./289.))*289.;}
        vec4 _permute(vec4 x){return _p289v4(((x*34.)+1.)*x);}
        vec4 _tiSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}

        float snoise(vec2 v){
            const vec4 C=vec4(.211324865405187,.366025403784439,-.577350269189626,.024390243902439);
            vec2 i=floor(v+dot(v,C.yy));
            vec2 x0=v-i+dot(i,C.xx);
            vec2 i1=(x0.x>x0.y)?vec2(1.,0.):vec2(0.,1.);
            vec4 x12=x0.xyxy+C.xxzz;
            x12.xy-=i1;
            i=mod(i,289.);
            vec3 p=_p289v3(_p289v3(i.y+vec3(0.,i1.y,1.))+i.x+vec3(0.,i1.x,1.));
            vec3 m=max(.5-vec3(dot(x0,x0),dot(x12.xy,x12.xy),dot(x12.zw,x12.zw)),0.);
            m=m*m;m=m*m;
            vec3 xv=2.*fract(p*C.www)-1.;
            vec3 h=abs(xv)-.5;
            vec3 ox=floor(xv+.5);
            vec3 a0=xv-ox;
            m*=1.79284291400159-.85373472095314*(a0*a0+h*h);
            vec3 g;
            g.x=a0.x*x0.x+h.x*x0.y;
            g.yz=a0.yz*x12.xz+h.yz*x12.yw;
            return 130.*dot(m,g);
        }

        float snoise(vec3 v){
            const vec2 C=vec2(1./6.,1./3.);
            const vec4 D=vec4(0.,.5,1.,2.);
            vec3 i=floor(v+dot(v,C.yyy));
            vec3 x0=v-i+dot(i,C.xxx);
            vec3 g=step(x0.yzx,x0.xyz);
            vec3 l=1.-g;
            vec3 i1=min(g.xyz,l.zxy);
            vec3 i2=max(g.xyz,l.zxy);
            vec3 x1=x0-i1+C.xxx;
            vec3 x2=x0-i2+C.yyy;
            vec3 x3=x0-D.yyy;
            i=_p289v3(i);
            vec4 p=_permute(_permute(_permute(
                i.z+vec4(0.,i1.z,i2.z,1.))
                +i.y+vec4(0.,i1.y,i2.y,1.))
                +i.x+vec4(0.,i1.x,i2.x,1.));
            float n_=1./7.;
            vec3 ns=n_*D.wyz-D.xzx;
            vec4 j=p-49.*floor(p*ns.z*ns.z);
            vec4 x_=floor(j*ns.z);
            vec4 y_=floor(j-7.*x_);
            vec4 x=x_*ns.x+ns.yyyy;
            vec4 y=y_*ns.x+ns.yyyy;
            vec4 h=1.-abs(x)-abs(y);
            vec4 b0=vec4(x.xy,y.xy);
            vec4 b1=vec4(x.zw,y.zw);
            vec4 s0=floor(b0)*2.+1.;
            vec4 s1=floor(b1)*2.+1.;
            vec4 sh=-step(h,vec4(0.));
            vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;
            vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
            vec3 p0=vec3(a0.xy,h.x);
            vec3 p1=vec3(a0.zw,h.y);
            vec3 p2=vec3(a1.xy,h.z);
            vec3 p3=vec3(a1.zw,h.w);
            vec4 norm=_tiSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
            p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;
            vec4 m=max(.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.);
            m=m*m;
            return 42.*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
        }
    `;

    // ============================================================
    // SIMULATION SHADER
    // ============================================================
    const SIM_VERT = /* glsl */`
        varying vec2 vUv;
        void main() {
            vUv = uv;
            gl_Position = vec4(position, 1.0);
        }
    `;

    const SIM_FRAG = /* glsl */`
        precision highp float;
        varying vec2 vUv;

        uniform sampler2D uPosition;
        uniform sampler2D uPosRefs;
        uniform vec2  uRingPos;
        uniform vec2  uRingVelocity;
        uniform vec2  uStretch;
        uniform float uTime;
        uniform float uDeltaTime;
        uniform float uRingRadius;
        uniform float uRingWidth;
        uniform float uRingWidth2;
        uniform float uRingDisplacement;
        uniform float uSweepAngle;

        ${NOISE_GLSL}

        void main() {
            vec4  pFrame   = texture2D(uPosition, vUv);
            vec2  refPos   = texture2D(uPosRefs,  vUv).xy;
            float scale    = pFrame.z;
            float velocity = pFrame.w;

            // Damped displacement from rest
            vec2 pos = pFrame.xy * 0.8;

            float dist  = distance(refPos, uRingPos);
            float n0    = snoise(vec3(refPos * 0.2 + vec2(18.4924, 72.9744), uTime * 0.25));
            float n0b   = snoise(vec3(refPos * 0.8 + vec2(33.712, 55.334), uTime * 0.18));
            float n0c   = snoise(vec3(refPos * 2.5 + vec2(91.445, 12.887), uTime * 0.12));

            // Warp the distance itself — breaks the perfect circle
            float warpedDist = dist + n0 * 0.12 + n0b * 0.06 + n0c * 0.03;
            float dist1 = warpedDist + n0 * 0.005;

            // Ring influence
            float t  = smoothstep(uRingRadius - uRingWidth  * 2., uRingRadius, warpedDist)
                     - smoothstep(uRingRadius, uRingRadius  + uRingWidth,  dist1);
            float t2 = smoothstep(uRingRadius - uRingWidth2 * 2., uRingRadius, warpedDist)
                     - smoothstep(uRingRadius, uRingRadius  + uRingWidth2, dist1);
            float t3 = smoothstep(uRingRadius + uRingWidth2, uRingRadius,  warpedDist);

            t  = pow(max(t,  0.0), 2.0);
            t2 = pow(max(t2, 0.0), 3.0);
            t  += t2 * 3.0;
            t  += t3 * 0.4;
            t  += snoise(vec3(refPos * 30. + vec2(11.4924, 12.9744), uTime * 0.25)) * t3 * 0.5;

            float nS = snoise(vec3(refPos * 2. + vec2(18.4924, 72.9744), uTime * 0.25));
            t += pow((nS + 1.5) * 0.5, 2.0) * 0.6;

            // Traveling sweep wave around ring circumference
            float particleAngle = atan(refPos.y - uRingPos.y, refPos.x - uRingPos.x);
            float angleDiff = abs(mod(particleAngle - uSweepAngle + 3.14159, 6.28318) - 3.14159);
            float sweep = pow(max(1.0 - angleDiff / 1.2, 0.0), 2.0);
            t += sweep * 0.8;

            // Multi-scale organic noise displacement
            float n1 = snoise(vec3(refPos * 4.  + vec2(88.494,  32.4397),  uTime * 0.175));
            float n2 = snoise(vec3(refPos * 4.  + vec2(50.904, 120.947),   uTime * 0.175));
            float n3 = snoise(vec3(refPos * 20. + vec2(18.4924, 72.9744),  uTime * 0.25));
            float n4 = snoise(vec3(refPos * 20. + vec2(50.904, 120.947),   uTime * 0.25));

            vec2 disp  = vec2(n1, n2) * 0.03;
            disp      += vec2(n3, n4) * 0.005;
            disp.x    += sin(refPos.x * 20. + uTime * 2.0) * 0.02 * clamp(dist, 0., 1.);
            disp.y    += cos(refPos.y * 20. + uTime * 1.5) * 0.02 * clamp(dist, 0., 1.);

            // Physics-based smear — trailing particles lag, leading ones lead
            float velMag = length(uRingVelocity);
            vec2 moveDir = velMag > 0.0001 ? normalize(uRingVelocity) : vec2(1.0, 0.0);
            vec2 toParticle = normalize(refPos - uRingPos + vec2(0.0001));
            float alignment = dot(toParticle, moveDir);

            float lagFactor = 1.0 + alignment * velMag * 10.0;
            lagFactor = clamp(lagFactor, 0.15, 3.5);

            // Perpendicular spread — ring fans out sideways during fast movement
            vec2 perp = vec2(-moveDir.y, moveDir.x);
            float perpSpread = dot(toParticle, perp) * velMag * 3.5;
            vec2 smear = perp * perpSpread * (1.0 - alignment * 0.5);

            pos -= (uRingPos - (refPos + disp)) * pow(max(t2, 0.0), 0.75) * uRingDisplacement * lagFactor;
            pos += smear * pow(max(t2, 0.0), 0.5) * 0.18;

            // Scale lerp toward ring influence
            scale    += (t - scale) * 0.2;
            velocity  = velocity * 0.5 + scale * 0.25;

            gl_FragColor = vec4(refPos + disp + pos * 0.25, scale, velocity);
        }
    `;

    // ============================================================
    // RENDER VERTEX SHADER
    // ============================================================
    const RENDER_VERT = /* glsl */`
        precision highp float;
        precision highp sampler2D;

        uniform sampler2D uPosition;
        uniform float     uParticleScale;
        uniform float     uPixelRatio;

        varying vec2  vLocalPos;
        varying float vScale;
        varying float vVelocity;

        void main() {
            vec4 data   = texture2D(uPosition, uv);
            vLocalPos   = data.xy;
            vScale      = data.z;
            vVelocity   = data.w;

            vec4 mvPos  = modelViewMatrix * vec4(data.xy, 0.0, 1.0);
            gl_Position = projectionMatrix * mvPos;

            gl_PointSize = max(1.0, vScale * 7.0 * uPixelRatio * 0.5 * uParticleScale);
        }
    `;

    // ============================================================
    // RENDER FRAGMENT SHADER
    // ============================================================
    const RENDER_FRAG = /* glsl */`
        precision highp float;

        uniform vec2  uRingPos;
        uniform float uTime;
        uniform float uAlpha;
        uniform vec3  uColor1;
        uniform vec3  uColor2;
        uniform vec3  uColor3;

        varying vec2  vLocalPos;
        varying float vScale;
        varying float vVelocity;

        ${NOISE_GLSL}

        float sdRoundBox(in vec2 p, in vec2 b, in vec4 r) {
            r.xy = (p.x > 0.0) ? r.xy : r.zw;
            r.x  = (p.y > 0.0) ? r.x  : r.y;
            vec2 q = abs(p) - b + r.x;
            return min(max(q.x, q.y), 0.0) + length(max(q, 0.0)) - r.x;
        }

        vec2 rotate2D(vec2 v, float a) {
            float s = sin(a), c = cos(a);
            return mat2(c, s, -s, c) * v;
        }

        void main() {
            if (vScale < 0.01) discard;

            float noiseAngle = snoise(vec3(vLocalPos * 10. + vec2(18.4924, 72.9744), uTime * 0.85));
            float angle      = atan(vLocalPos.y - uRingPos.y, vLocalPos.x - uRingPos.x);

            vec2 uv  = gl_PointCoord.xy - 0.5;
            uv.y    *= -1.0;
            uv       = rotate2D(uv, -angle + noiseAngle * 0.5);

            float rounded = sdRoundBox(uv, vec2(0.5, 0.2), vec4(0.25));
            rounded = smoothstep(0.1, 0.0, rounded);

            float a = uAlpha * rounded * smoothstep(0.1, 0.2, vScale);
            if (a < 0.01) discard;

            float noiseColor = snoise(vec3(vLocalPos * 2. + vec2(74.664, 91.556), uTime * 0.5));
            noiseColor = (noiseColor + 1.0) * 0.5;

            float h        = 0.8;
            float progress = smoothstep(0.0, 0.75, pow(noiseColor, 2.0));
            vec3 col = mix(
                mix(uColor1, uColor2, progress / h),
                mix(uColor2, uColor3, (progress - h) / (1.0 - h)),
                step(h, progress)
            );

            col = mix(col, col * clamp(vVelocity, 0.0, 1.0), 1.0);
            col = clamp(col, 0.0, 1.0);

            gl_FragColor = vec4(col, clamp(a, 0.0, 1.0));
        }
    `;

    // ============================================================
    // PING-PONG FBO
    // ============================================================
    function makeTarget() {
        return new THREE.WebGLRenderTarget(SIM_SIZE, SIM_SIZE, {
            minFilter:     THREE.NearestFilter,
            magFilter:     THREE.NearestFilter,
            format:        THREE.RGBAFormat,
            type:          floatSupport,
            depthBuffer:   false,
            stencilBuffer: false
        });
    }

    let targetA = makeTarget();
    let targetB = makeTarget();

    // ============================================================
    // POSITION TEXTURE
    // ============================================================
    function makePositionTexture(aspect) {
        const data = new Float32Array(SIM_SIZE * SIM_SIZE * 4);
        for (let i = 0; i < SIM_SIZE; i++) {
            for (let j = 0; j < SIM_SIZE; j++) {
                const idx = (i * SIM_SIZE + j) * 4;
                const u = (j + 0.5) / SIM_SIZE;
                const v = (i + 0.5) / SIM_SIZE;
                const jx = (Math.random() - 0.5) * (2.0 * aspect / SIM_SIZE) * 0.8;
                const jy = (Math.random() - 0.5) * (2.0        / SIM_SIZE) * 0.8;
                data[idx + 0] = (u - 0.5) * 2.0 * aspect + jx;
                data[idx + 1] = (v - 0.5) * 2.0           + jy;
                data[idx + 2] = 0.0;
                data[idx + 3] = 0.0;
            }
        }
        const tex = new THREE.DataTexture(data, SIM_SIZE, SIM_SIZE, THREE.RGBAFormat, floatSupport);
        tex.needsUpdate = true;
        return tex;
    }

    let currentAspect = window.innerWidth / window.innerHeight;
    let posRefsTex    = makePositionTexture(currentAspect);

    function seedTarget(target, tex) {
        const seedScene = new THREE.Scene();
        const seedCam   = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
        const mesh      = new THREE.Mesh(
            new THREE.PlaneGeometry(2, 2),
            new THREE.MeshBasicMaterial({ map: tex })
        );
        seedScene.add(mesh);
        renderer.setRenderTarget(target);
        renderer.render(seedScene, seedCam);
        renderer.setRenderTarget(null);
        mesh.geometry.dispose();
        mesh.material.dispose();
    }
    seedTarget(targetA, posRefsTex);

    // ============================================================
    // SIMULATION SCENE
    // ============================================================
    const simScene = new THREE.Scene();
    const simCam   = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const simUniforms = {
        uPosition:         { value: targetA.texture },
        uPosRefs:          { value: posRefsTex },
        uRingPos:          { value: new THREE.Vector2(0, 0) },
        uRingVelocity:     { value: new THREE.Vector2(0, 0) },
        uStretch:          { value: new THREE.Vector2(0, 0) },
        uTime:             { value: 0.0 },
        uDeltaTime:        { value: 0.016 },
        uRingRadius:       { value: 0.5 },
        uRingWidth:        { value: RING_WIDTH },
        uRingWidth2:       { value: RING_WIDTH2 },
        uRingDisplacement: { value: RING_DISPLACEMENT },
        uSweepAngle:       { value: 0.0 },
    };

    simScene.add(new THREE.Mesh(
        new THREE.PlaneGeometry(2, 2),
        new THREE.ShaderMaterial({
            vertexShader:   SIM_VERT,
            fragmentShader: SIM_FRAG,
            uniforms:       simUniforms,
            depthTest:      false,
            depthWrite:     false
        })
    ));

    // ============================================================
    // RENDER SCENE
    // ============================================================
    const renderCam = new THREE.OrthographicCamera(
        -currentAspect, currentAspect,
        1, -1,
        0.1, 10
    );
    renderCam.position.z = 1;

    const renderScene = new THREE.Scene();

    const COUNT  = SIM_SIZE * SIM_SIZE;
    const uvArr  = new Float32Array(COUNT * 2);
    const posArr = new Float32Array(COUNT * 3);

    for (let i = 0; i < SIM_SIZE; i++) {
        for (let j = 0; j < SIM_SIZE; j++) {
            const idx = (i * SIM_SIZE + j);
            uvArr[idx * 2 + 0] = (j + 0.5) / SIM_SIZE;
            uvArr[idx * 2 + 1] = (i + 0.5) / SIM_SIZE;
        }
    }

    const partGeo = new THREE.BufferGeometry();
    partGeo.setAttribute('position', new THREE.BufferAttribute(posArr, 3));
    partGeo.setAttribute('uv',       new THREE.BufferAttribute(uvArr,  2));

    const palette = PALETTES.dev;

    const renderUniforms = {
        uPosition:      { value: targetA.texture },
        uParticleScale: { value: PARTICLE_SCALE },
        uPixelRatio:    { value: Math.min(devicePixelRatio, 2) },
        uRingPos:       { value: new THREE.Vector2(0, 0) },
        uTime:          { value: 0.0 },
        uAlpha:         { value: 1.0 },
        uColor1:        { value: palette.color1.clone() },
        uColor2:        { value: palette.color2.clone() },
        uColor3:        { value: palette.color3.clone() }
    };

    const partMat = new THREE.ShaderMaterial({
        vertexShader:   RENDER_VERT,
        fragmentShader: RENDER_FRAG,
        uniforms:       renderUniforms,
        transparent:    true,
        depthWrite:     false,
        depthTest:      false
    });

    renderScene.add(new THREE.Points(partGeo, partMat));

    // ============================================================
    // MOUSE / PHYSICS STATE
    // ============================================================
    const ringPos     = new THREE.Vector2(0, 0);
    const ringVel     = new THREE.Vector2(0, 0);
    const ringStretch = new THREE.Vector2(0, 0);
    let   targetRing  = new THREE.Vector2(9999, 9999);

    function screenToWorld(px, py) {
        const rect = renderer.domElement.getBoundingClientRect();
        return new THREE.Vector2(
             ((px - rect.left) / rect.width  - 0.5) * 2.0 * currentAspect,
            -((py - rect.top)  / rect.height - 0.5) * 2.0
        );
    }

    window.addEventListener('mousemove', e => {
        targetRing.copy(screenToWorld(e.clientX, e.clientY));
    });
    window.addEventListener('touchmove', e => {
        const t = e.touches[0];
        targetRing.copy(screenToWorld(t.clientX, t.clientY));
    }, { passive: true });
    window.addEventListener('mouseleave', () => { targetRing.set(9999, 9999); });

    // ============================================================
    // ANIMATION LOOP
    // ============================================================
    const clock = new THREE.Clock();

    function animate() {
        requestAnimationFrame(animate);

        // FIX: getDelta() MUST come before getElapsedTime()
        const delta   = Math.min(clock.getDelta(), 0.05);
        const elapsed = clock.getElapsedTime();

        const isMouseActive = targetRing.x < 9000;

        // Idle drift — Lissajous path, stays near center
        const idleX = Math.sin(elapsed * 0.08) * 0.25 * currentAspect
                    + Math.sin(elapsed * 0.05 + 1.7) * 0.10 * currentAspect;
        const idleY = Math.cos(elapsed * 0.07) * 0.20
                    + Math.cos(elapsed * 0.04 + 0.9) * 0.08;

        const tx = isMouseActive ? targetRing.x : idleX;
        const ty = isMouseActive ? targetRing.y : idleY;

        // Spring physics — smooth lag with gentle bounce
        const springK = isMouseActive ? 0.0008 : 0.0005;
        const damping  = 0.97;
        
        ringVel.x = ringVel.x * damping + (tx - ringPos.x) * springK;
        ringVel.y = ringVel.y * damping + (ty - ringPos.y) * springK;
        ringPos.x += ringVel.x;
        ringPos.y += ringVel.y;

        // Stretch tracks velocity, decays to zero at rest
        ringStretch.x += (ringVel.x * 2.5 - ringStretch.x) * 0.08;
        ringStretch.y += (ringVel.y * 2.5 - ringStretch.y) * 0.08;

        // Radius breathes between min and max (~20s cycle)
        const ringRadius = RING_RADIUS_MIN +
            (RING_RADIUS_MAX - RING_RADIUS_MIN) * (Math.sin(elapsed * 0.08) * 0.5 + 0.5);

        // ---- PASS 1: Simulation → targetB ----
        simUniforms.uPosition.value            = targetA.texture;
        simUniforms.uRingPos.value.copy(ringPos);
        simUniforms.uRingVelocity.value.copy(ringVel);
        simUniforms.uStretch.value.copy(ringStretch);
        simUniforms.uTime.value                = elapsed;
        simUniforms.uDeltaTime.value           = delta;
        simUniforms.uRingRadius.value          = ringRadius;
        simUniforms.uPosRefs.value             = posRefsTex;
        simUniforms.uSweepAngle.value          = (elapsed * 0.18) % (Math.PI * 2);

        renderer.setRenderTarget(targetB);
        renderer.render(simScene, simCam);

        // Ping-pong swap
        const tmp = targetA; targetA = targetB; targetB = tmp;

        // ---- PASS 2: Render to screen ----
        renderUniforms.uPosition.value = targetA.texture;
        renderUniforms.uRingPos.value.copy(ringPos);
        renderUniforms.uTime.value     = elapsed;

        renderer.setRenderTarget(null);
        renderer.setClearColor(
            document.body.classList.contains('cyber-mode') ? 0x050505 : 0x0d0d0d,
            1
        );
        renderer.render(renderScene, renderCam);
    }

    animate();

    // ============================================================
    // RESIZE HANDLER
    // ============================================================
    window.addEventListener('resize', () => {
        const W = window.innerWidth;
        const H = window.innerHeight;
        currentAspect = W / H;

        renderer.setSize(W, H);

        targetA.dispose();
        targetB.dispose();
        targetA = makeTarget();
        targetB = makeTarget();

        posRefsTex.dispose();
        posRefsTex = makePositionTexture(currentAspect);
        simUniforms.uPosRefs.value = posRefsTex;

        seedTarget(targetA, posRefsTex);

        renderCam.left   = -currentAspect;
        renderCam.right  =  currentAspect;
        renderCam.updateProjectionMatrix();
    });

    // ============================================================
    // PUBLIC API
    // ============================================================
    window.particleSetMode = function (mode) {
        const p = PALETTES[mode] || PALETTES.dev;

        const c1 = renderUniforms.uColor1.value;
        const c2 = renderUniforms.uColor2.value;
        const c3 = renderUniforms.uColor3.value;

        let step = 0;
        const totalSteps = 30;
        const tick = () => {
            if (step >= totalSteps) return;
            c1.lerp(p.color1, 0.12);
            c2.lerp(p.color2, 0.12);
            c3.lerp(p.color3, 0.12);
            step++;
            requestAnimationFrame(tick);
        };
        tick();

        simUniforms.uRingDisplacement.value = 2.8;
        setTimeout(() => { simUniforms.uRingDisplacement.value = RING_DISPLACEMENT; }, 700);
    };

})();