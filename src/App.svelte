<script>
  import { onMount } from 'svelte';

  /* ==========================================
     1. パレット & ドット絵スプライトデータ
     ========================================== */
  const P = {
    "0": "transparent",
    "1": "#111f28", // 主線
    "2": "#38bdf8", // メインボディ
    "3": "#f43f5e", // ほっぺ・アクセント
    "4": "#fbbf24"  // アイテム
  };

  // まるっち風ベビー（通常）
  const babySprite = [
    "0000000000000000",
    "0000011111100000",
    "0001122222211000",
    "0012222222222100",
    "0122222222222210",
    "0122211221122210",
    "0122211221122210",
    "0122322112232210",
    "0122222222222210",
    "0012222222222100",
    "0001122222211000",
    "0000011111100000",
    "0000000000000000",
    "0000000000000000",
    "0000000000000000",
    "0000000000000000"
  ];

  // まるっち風ベビー（潰れ顔）
  const babySquish = [
    "0000000000000000",
    "0000000000000000",
    "0000011111100000",
    "0001122222211000",
    "0012211221122100",
    "0122211221122210",
    "0122211221122210",
    "0122322112232210",
    "0122221111222210",
    "0012222222222100",
    "0001111111111000",
    "0000000000000000",
    "0000000000000000",
    "0000000000000000",
    "0000000000000000",
    "0000000000000000"
  ];

  // まるっち風ベビー（すね顔・ジト目）
  const babySulk = [
    "0000000000000000",
    "0000011111100000",
    "0001122222211000",
    "0012222222222100",
    "0122222222222210",
    "0122211121112210",
    "0122200020002210",
    "0122222211222210",
    "0122222122122210",
    "0012222222222100",
    "0001122222211000",
    "0000011111100000",
    "0000000000000000",
    "0000000000000000",
    "0000000000000000",
    "0000000000000000"
  ];

  const kidsPuku = [
    "000000000000000000000000",
    "000000000111110000000000",
    "000000001222221000000000",
    "000000012222222100000000",
    "000000122222222210000000",
    "000001221122211221000000",
    "000001221122211221000000",
    "000012221122211222100000",
    "000012222222222222100000",
    "000012232211122322100000",
    "000012222222222222100000",
    "000001222222222210000000",
    "000001122111122110000000",
    "000000121222212100000000",
    "000000120122102100000000",
    "000000110011001100000000",
    "000000000000000000000000",
    "000000000000000000000000",
    "000000000000000000000000",
    "000000000000000000000000",
    "000000000000000000000000",
    "000000000000000000000000",
    "000000000000000000000000",
    "000000000000000000000000"
  ];

  const pukuSquish = [
    "000000000000000000000000",
    "000000000000000000000000",
    "000000011111111100000000",
    "000001122222222211000000",
    "000012222222222222100000",
    "000122211222221122210000",
    "000122211222221122210000",
    "000122222222222222210000",
    "000122332211122332210000",
    "000122222222222222210000",
    "000012222222222222100000",
    "000001111111111111000000",
    "000000000000000000000000",
    "000000000000000000000000",
    "000000000000000000000000",
    "000000000000000000000000",
    "000000000000000000000000",
    "000000000000000000000000",
    "000000000000000000000000",
    "000000000000000000000000",
    "000000000000000000000000",
    "000000000000000000000000",
    "000000000000000000000000",
    "000000000000000000000000"
  ];

  const kidsSulk = [
    "000000000000000000000000",
    "000000000111110000000000",
    "000000001222221000000000",
    "000000012222222100000000",
    "000000122222222210000000",
    "000001222222222221000000",
    "000001222222222221000000",
    "000012222222222222100000",
    "000012222222222222100000",
    "000012232222222322100000",
    "000012222222222222100000",
    "000001222222222221000000",
    "000001122111122110000000",
    "000000121222212100000000",
    "000000120122102100000000",
    "000000110011001100000000",
    "000000000000000000000000",
    "000000000000000000000000",
    "000000000000000000000000",
    "000000000000000000000000",
    "000000000000000000000000",
    "000000000000000000000000",
    "000000000000000000000000",
    "000000000000000000000000"
  ];

  const kidsSui = [
    "000000000000000000000000",
    "000000000011110000000000",
    "000000000122221000000000",
    "000000001222222100000000",
    "000000012222222210000000",
    "000000122112211221000000",
    "000000122112211221000000",
    "011000122222222221000110",
    "122111222322223222111221",
    "012222222111122222222100",
    "001222212222221222210000",
    "000110012222221001100000",
    "000000001122110000000000",
    "000000000122100000000000",
    "000000001222210000000000",
    "000000012211221000000000",
    "000000011000011000000000",
    "000000000000000000000000",
    "000000000000000000000000",
    "000000000000000000000000",
    "000000000000000000000000",
    "000000000000000000000000",
    "000000000000000000000000",
    "000000000000000000000000"
  ];

  const suiSquish = [
    "000000000000000000000000",
    "000000000000000000000000",
    "000000111111111100000000",
    "011001222222222210000110",
    "122112221122112221111221",
    "012222221122112222222100",
    "001222232222223222210000",
    "000112221111112221100000",
    "000001111111111111000000",
    "000000000000000000000000",
    "000000000000000000000000",
    "000000000000000000000000",
    "000000000000000000000000",
    "000000000000000000000000",
    "000000000000000000000000",
    "000000000000000000000000",
    "000000000000000000000000",
    "000000000000000000000000",
    "000000000000000000000000",
    "000000000000000000000000",
    "000000000000000000000000",
    "000000000000000000000000",
    "000000000000000000000000",
    "000000000000000000000000"
  ];

  const kidsFuwa = [
    "000000000000000000000000",
    "001100000111100000110000",
    "012210001222210001221000",
    "012211012222221011221000",
    "001122222222222222110000",
    "000012222222222222100000",
    "000012211222211221000000",
    "000012211222211221000000",
    "000012232222223221000000",
    "000012222211222221000000",
    "000012222222222221000000",
    "000001222222222210000000",
    "000001122222222110000000",
    "000012211222211221000000",
    "000001100111100110000000",
    "000000000000000000000000",
    "000000000000000000000000",
    "000000000000000000000000",
    "000000000000000000000000",
    "000000000000000000000000",
    "000000000000000000000000",
    "000000000000000000000000",
    "000000000000000000000000",
    "000000000000000000000000"
  ];

  const fuwaSquish = [
    "000000000000000000000000",
    "011000000000000000000110",
    "12211001111111100011221",
    "01222112222222211122210",
    "00112221122221122211000",
    "00012221122221122210000",
    "00012232222222322210000",
    "00012222111111222210000",
    "00001111111111111100000",
    "000000000000000000000000",
    "000000000000000000000000",
    "000000000000000000000000",
    "000000000000000000000000",
    "000000000000000000000000",
    "000000000000000000000000",
    "000000000000000000000000",
    "000000000000000000000000",
    "000000000000000000000000",
    "000000000000000000000000",
    "000000000000000000000000",
    "000000000000000000000000",
    "000000000000000000000000",
    "000000000000000000000000",
    "000000000000000000000000"
  ];

  /* ==========================================
     2. Web Audio SE
     ========================================== */
  let audioCtx = null;
  function initAudio() {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
  }

  function playSE(type) {
    if (!audioCtx) return;
    const now = audioCtx.currentTime;
    
    if (type === 'feed') {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(400, now);
      osc.frequency.exponentialRampToValueAtTime(800, now + 0.1);
      gain.gain.setValueAtTime(0.3, now);
      gain.gain.linearRampToValueAtTime(0, now + 0.12);
      osc.connect(gain); gain.connect(audioCtx.destination);
      osc.start(now); osc.stop(now + 0.12);
    } else if (type === 'pet') {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(350, now);
      osc.frequency.linearRampToValueAtTime(500, now + 0.08);
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.linearRampToValueAtTime(0, now + 0.08);
      osc.connect(gain); gain.connect(audioCtx.destination);
      osc.start(now); osc.stop(now + 0.08);
    } else if (type === 'squish') {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(180, now);
      osc.frequency.linearRampToValueAtTime(70, now + 0.2);
      gain.gain.setValueAtTime(0.4, now);
      gain.gain.linearRampToValueAtTime(0, now + 0.25);
      osc.connect(gain); gain.connect(audioCtx.destination);
      osc.start(now); osc.stop(now + 0.25);
    } else if (type === 'clean') {
      for(let i=0; i<3; i++) {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(500 + i*250, now + i*0.05);
        gain.gain.setValueAtTime(0.15, now + i*0.05);
        gain.gain.linearRampToValueAtTime(0, now + i*0.05 + 0.08);
        osc.connect(gain); gain.connect(audioCtx.destination);
        osc.start(now + i*0.05); osc.stop(now + i*0.05 + 0.08);
      }
    } else if (type === 'buy') {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(523, now);
      osc.frequency.setValueAtTime(659, now + 0.08);
      gain.gain.setValueAtTime(0.25, now);
      gain.gain.linearRampToValueAtTime(0, now + 0.2);
      osc.connect(gain); gain.connect(audioCtx.destination);
      osc.start(now); osc.stop(now + 0.2);
    } else if (type === 'evolve') {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(300, now);
      osc.frequency.exponentialRampToValueAtTime(1200, now + 0.3);
      gain.gain.setValueAtTime(0.4, now);
      gain.gain.linearRampToValueAtTime(0, now + 0.4);
      osc.connect(gain); gain.connect(audioCtx.destination);
      osc.start(now); osc.stop(now + 0.4);
    }
  }

  /* ==========================================
     3. 状態管理（Svelteリアクティブ）
     ========================================== */
  let aliveSeconds = $state(0); // 育成総カウント（秒）
  let coins = $state(50);
  let stage = $state(0);
  let branchType = $state('puku');
  let mood = $state(80);
  let satiety = $state(80);
  let cleanliness = $state(90);
  let petCount = $state(0);
  // 今の世代のお世話傾向。なでる・ごはん・遊びの回数を記録する
  let petCareCount = $state(0);
  let feedCareCount = $state(0);
  let playCareCount = $state(0);
  let discoveredTypes = $state([]);
  let generation = $state(1);
  let showDex = $state(false);
  let showGenerationChoice = $state(false);
  let showGenerationPanel = $state(false);

  let inventory = $state(['ball']);
  let activeToy = $state(null);
  let toyX = $state(64), toyY = $state(64);

  // 高級アイテム「ぷかぷか潜水艇」専用の動き。既存のおもちゃとは独立。
  let submarineMode = 'idle'; // idle / boarding / exploring / startled
  let submarineEvent = '';
  let submarineEventTimer = 0;
  let submarineReactionTimer = 0;
  let submarineTravelTimer = 0;
  let submarineDirection = 1;
  let submarineNextEvent = 700 + Math.floor(Math.random() * 500);

  // 高級アイテム「きらきら流星ランプ」専用の自動あそび
  let meteorMode = 'idle'; // idle / waiting / flying / burst
  let meteorX = 18;
  let meteorY = 24;
  let meteorVX = 0.45;
  let meteorVY = 0.12;
  let meteorTimer = 0;
  let meteorNextEvent = 240 + Math.floor(Math.random() * 240);
  let meteorTrail = [];
  // 流星を待つ間も、ランプの周りで自分から遊ぶための動き
  let meteorWanderX = 64;
  let meteorWanderY = 64;
  let meteorWanderTimer = 0;
  let meteorHopTimer = 0;

  // 高級アイテム「まねっこ水鏡」専用のしぐさ
  let mirrorMode = 'idle'; // idle / approach / watch / tilt / peek / startled
  let mirrorTimer = 0;
  let mirrorDirection = 1;

  let isSulking = $state(false);
  let isSquished = $state(false);
  let squishTimer = 0;

  // 進化カットイン演出フラグ
  let isEvolving = $state(false);
  let evolveText = $state("");

  let posX = 64, posY = 64;
  let blinkFrames = 0;
  let blinkWait = 180 + Math.floor(Math.random() * 180);
  let vx = 0, vy = 0;
  let targetX = 64, targetY = 64;
  let isNight = $state(false);

  let bubbles = [];
  let foods = [];
  let particles = [];

  // 水槽に現れるトイレの汚れ（最大2個）
  let dirtPatches = $state([]);
  let dirtTimer = 0;
  let nextDirtAt = 300 + Math.floor(Math.random() * 181);

  let canvasEl, gameCanvasEl;
  let ctx, gctx;

  let showGameModal = $state(false);
  let showGamesModal = $state(false);
  let showStoreModal = $state(false);
  let tapCounter = 0;
  let tapResetTimer = null;

  let stageText = $derived(["ベビー期", "キッズ期", "アダルト期"][stage]);
  let branchText = $derived(stage === 0 ? "タイプ: まんまる" : `タイプ: ${{puku:'ぷくぷく系', sui:'すいすい系', fuwa:'ふわふわ系'}[branchType]}`);

  let alertMsg = $state('');

  function showAlert(msg) {
    alertMsg = msg;
    setTimeout(() => { alertMsg = ''; }, 2500);
  }

  onMount(() => {
    ctx = canvasEl.getContext('2d');
    
    for(let i=0; i<12; i++) {
      bubbles.push({
        x: Math.random() * 128,
        y: Math.random() * 128,
        r: Math.random() * 1.5 + 0.5,
        speed: Math.random() * 0.15 + 0.05
      });
    }

    loadData();

    let animId;
    function loop() {
      updatePhysics();
      render();
      animId = requestAnimationFrame(loop);
    }
    loop();

    const interval = setInterval(() => {
      aliveSeconds++; // 毎秒カウントアップ

      // メーターはゆっくり減る。おなかは1時間に約7.2、きれいさは1日に約10減少。
      satiety = Math.max(0, satiety - 0.002);
      cleanliness = Math.max(0, cleanliness - (10 / 86400));

      // トイレの汚れは時間とともに現れる。放置してもペナルティはない。
      if (dirtPatches.length < 2) {
        dirtTimer++;
        if (dirtTimer >= nextDirtAt) {
          // キャラクターの近くを避けて、水槽の端寄りに汚れを出す
          let dirtX;
          let dirtY;
          do {
            dirtX = 10 + Math.random() * 108;
            dirtY = 18 + Math.random() * 100;
          } while (dirtX > 40 && dirtX < 88 && dirtY > 35 && dirtY < 95);

          dirtPatches = [...dirtPatches, {
            id: Date.now() + Math.random(),
            x: dirtX,
            y: dirtY
          }];
          dirtTimer = 0;
          nextDirtAt = 300 + Math.floor(Math.random() * 181);
        }
      }
      
      // ごきげんもゆっくり減らし、ほかのメーターが低くても急減させない。
      mood = Math.max(0, mood - 0.001);

      checkEvolution();
      saveData();
    }, 1000);

    return () => {
      cancelAnimationFrame(animId);
      clearInterval(interval);
    };
  });

  function saveData() {
    localStorage.setItem('minamo_save_v3', JSON.stringify({
      aliveSeconds, coins, stage, branchType, mood, satiety, cleanliness, petCount,
      petCareCount, feedCareCount, playCareCount, discoveredTypes, generation,
      inventory, dirtPatches, lastLeaveTime: Date.now()
    }));
  }

  function loadData() {
    const data = localStorage.getItem('minamo_save_v3');
    if (data) {
      try {
        const obj = JSON.parse(data);
        aliveSeconds = obj.aliveSeconds || 0;
        coins = obj.coins ?? 50;
        stage = obj.stage || 0;
        branchType = obj.branchType || 'puku';
        mood = obj.mood ?? 80;
        satiety = obj.satiety ?? 80;
        cleanliness = obj.cleanliness ?? 90;
        petCount = obj.petCount || 0;
        petCareCount = obj.petCareCount || 0;
        feedCareCount = obj.feedCareCount || 0;
        playCareCount = obj.playCareCount || 0;
        discoveredTypes = Array.isArray(obj.discoveredTypes) ? obj.discoveredTypes : [];
        generation = obj.generation || 1;
        inventory = obj.inventory || ['ball'];
        dirtPatches = Array.isArray(obj.dirtPatches) ? obj.dirtPatches : [];

        if (obj.lastLeaveTime) {
          const offlineSeconds = Math.floor((Date.now() - obj.lastLeaveTime) / 1000);
          if (offlineSeconds > 10) {
            aliveSeconds += offlineSeconds;
            const hours = offlineSeconds / 3600;
            // お休み中は、おなか・ごきげんを減らさない。
            // きれいさだけは、1日あたり約10ポイントのゆるやかな低下にする。
            cleanliness = Math.max(0, cleanliness - hours * (10 / 24));

            const minutesPassed = Math.floor(offlineSeconds / 60);
            if (minutesPassed >= 1) {
              showAlert(`${minutesPassed}分間おやすみしていました`);
            }
          }
        }
      } catch(e){}
    }
  }

  function getCurrentSprite() {
    if (isSquished) {
      if (stage === 0) return { sprite: babySquish, size: 16 };
      if (branchType === 'sui') return { sprite: suiSquish, size: 24 };
      if (branchType === 'fuwa') return { sprite: fuwaSquish, size: 24 };
      return { sprite: pukuSquish, size: 24 };
    }

    if (isSulking) {
      if (stage === 0) return { sprite: babySulk, size: 16 };
      return { sprite: kidsSulk, size: 24 };
    }

    if (stage === 0) return { sprite: babySprite, size: 16 };
    if (stage === 1) {
      if (branchType === 'sui') return { sprite: kidsSui, size: 24 };
      if (branchType === 'fuwa') return { sprite: kidsFuwa, size: 24 };
      return { sprite: kidsPuku, size: 24 };
    }
    // アダルト期 (最終形態)
    if (branchType === 'sui') return { sprite: kidsSui, size: 24 };
    if (branchType === 'fuwa') return { sprite: kidsFuwa, size: 24 };
    return { sprite: kidsPuku, size: 24 };
  }

  function updatePhysics() {
    // 数秒おきに短い瞬きをする（既存のスプライトや位置は変更しない）
    if (blinkFrames > 0) {
      blinkFrames--;
    } else {
      blinkWait--;
      if (blinkWait <= 0) {
        blinkFrames = 8;
        blinkWait = 180 + Math.floor(Math.random() * 180);
      }
    }

    // ベビー期以外で、おなか・ごきげんがかなり低い時だけいじける
    isSulking = (stage > 0 && (satiety < 20 || mood < 20));

    if (isSquished) {
      squishTimer++;
      if (squishTimer > 90) {
        isSquished = false;
        squishTimer = 0;
      }
      return;
    }

    // 潜水艇が出ている間だけ、キャラクターが乗り込み・探検する動きを使う。
    // おにぎりキャッチや通常のおもちゃの処理には触れない。
    if (activeToy === 'submarine' && !isSulking) {
      submarineTravelTimer++;

      if (submarineMode === 'boarding') {
        targetX = toyX;
        targetY = toyY - 9;
        vx = vx * 0.88 + (targetX - posX) * 0.012;
        vy = vy * 0.88 + (targetY - posY) * 0.012;
        posX += vx;
        posY += vy;

        if (Math.hypot(posX - targetX, posY - targetY) < 5 || submarineTravelTimer > 100) {
          posX = toyX;
          posY = toyY - 9;
          vx = 0;
          vy = 0;
          submarineMode = 'exploring';
          submarineNextEvent = 500 + Math.floor(Math.random() * 600);
          showAlert('🚤 潜水艇で探検スタート！');
        }
        return;
      }

      if (submarineMode === 'startled') {
        submarineReactionTimer--;
        toyX = Math.max(18, Math.min(110, toyX + submarineDirection * 0.9));
        toyY = Math.max(24, Math.min(104, toyY + (Math.random() - 0.5) * 1.2));
        posX += (toyX - posX) * 0.22;
        posY += (toyY - 9 - posY) * 0.22;
        if (submarineEventTimer > 0) submarineEventTimer--;
        if (submarineReactionTimer <= 0) {
          submarineMode = 'exploring';
          submarineEvent = '';
          submarineEventTimer = 0;
          submarineNextEvent = 500 + Math.floor(Math.random() * 700);
        }
        return;
      }

      if (submarineMode === 'exploring') {
        // 水槽の端で向きを変えながら、ゆっくり進む。
        toyX += submarineDirection * 0.11;
        toyY = Math.max(27, Math.min(101, toyY + Math.sin(submarineTravelTimer * 0.025) * 0.035));
        if (toyX > 108) submarineDirection = -1;
        if (toyX < 20) submarineDirection = 1;

        // キャラクターは潜水艇の窓の位置に自然に寄り添う。
        posX += (toyX - posX) * 0.08;
        posY += (toyY - 9 - posY) * 0.08;
        vx = 0;
        vy = 0;

        if (submarineEventTimer > 0) submarineEventTimer--;
        else if (submarineEvent) submarineEvent = '';

        submarineNextEvent--;
        if (submarineNextEvent <= 0 && !submarineEvent) {
          const events = ['shadow', 'bubbles', 'fish', 'current'];
          submarineEvent = events[Math.floor(Math.random() * events.length)];
          submarineEventTimer = 95;
          submarineNextEvent = 850 + Math.floor(Math.random() * 800);
          const eventMessages = {
            shadow: 'なぞの影が横切った！',
            bubbles: '泡で窓がいっぱい！',
            fish: '小さな魚影を発見！',
            current: '急な水流だ！'
          };
          showAlert(eventMessages[submarineEvent]);
          if (submarineEvent === 'current') {
            submarineDirection *= -1;
            submarineReactionTimer = 24;
          }
        }

        if (submarineReactionTimer > 0) {
          submarineReactionTimer--;
          toyX += submarineDirection * 0.28;
        }
        return;
      }
    }

    // 水鏡が置かれている間、鏡を見つめたり、首を傾けたり、裏側を覗いたりする。
    if (activeToy === 'waterMirror' && !isSulking) {
      mirrorTimer++;
      if (mirrorMode === 'idle') mirrorMode = 'approach';
      if (mirrorMode === 'approach') {
        targetX = toyX - 13;
        targetY = toyY + 5;
        if (Math.hypot(posX - targetX, posY - targetY) < 5 || mirrorTimer > 100) {
          mirrorMode = 'watch';
          mirrorTimer = 0;
          showAlert('🪞 あれ？ 鏡にだれかいる…？');
        }
      } else if (mirrorMode === 'watch') {
        targetX = toyX - 13;
        targetY = toyY + 5;
        if (mirrorTimer > 100) {
          mirrorMode = 'tilt';
          mirrorTimer = 0;
          mirrorDirection = Math.random() < 0.5 ? -1 : 1;
        }
      } else if (mirrorMode === 'tilt') {
        targetX = toyX - 13 + mirrorDirection * 3;
        targetY = toyY + 5;
        if (mirrorTimer > 45) {
          mirrorMode = 'peek';
          mirrorTimer = 0;
          showAlert('🫧 鏡のうしろも気になるみたい…');
        }
      } else if (mirrorMode === 'peek') {
        targetX = toyX + 10;
        targetY = toyY + 8;
        if (mirrorTimer > 70) {
          if (Math.random() < 0.35) {
            mirrorMode = 'startled';
            showAlert('😳 自分の姿にびっくり！');
            playSE('squish');
          } else {
            mirrorMode = 'watch';
          }
          mirrorTimer = 0;
        }
      } else if (mirrorMode === 'startled') {
        targetX = toyX - 23;
        targetY = toyY + 10;
        if (mirrorTimer > 28) {
          mirrorMode = 'watch';
          mirrorTimer = 0;
        }
      }
    } else if (mirrorMode !== 'idle') {
      mirrorMode = 'idle';
      mirrorTimer = 0;
    }

    // 流星ランプが置かれている間、一定時間ごとに流星が自動で現れる。
    // 既存の移動処理を利用し、キャラクターのスプライトや操作は変更しない。
    if (activeToy === 'meteorLamp' && !isSulking) {
      if (meteorMode === 'idle') {
        meteorMode = 'waiting';
        meteorTimer = 0;
        meteorNextEvent = 240 + Math.floor(Math.random() * 240);
      }

      if (meteorMode === 'waiting') {
        meteorNextEvent--;
        // 流星が出ていない間も、ランプの近くをうろうろ。
        // 一定時間ごとに行き先を変えて、たまにぴょんっと跳ねる。
        meteorWanderTimer--;
        if (meteorWanderTimer <= 0) {
          const angle = Math.random() * Math.PI * 2;
          const distance = 7 + Math.random() * 13;
          meteorWanderX = Math.max(8, Math.min(120, toyX + Math.cos(angle) * distance));
          meteorWanderY = Math.max(14, Math.min(112, toyY + Math.sin(angle) * distance));
          meteorWanderTimer = 42 + Math.floor(Math.random() * 48);
          if (Math.random() < 0.72) meteorHopTimer = 18 + Math.floor(Math.random() * 12);
        }
        if (meteorHopTimer > 0) meteorHopTimer--;
        targetX = meteorWanderX;
        targetY = meteorWanderY;
        if (meteorNextEvent <= 0) {
          meteorMode = 'flying';
          meteorX = Math.random() < 0.5 ? 8 : 120;
          meteorY = 20 + Math.random() * 78;
          meteorVX = meteorX < 64 ? 0.48 + Math.random() * 0.22 : -(0.48 + Math.random() * 0.22);
          meteorVY = (Math.random() - 0.5) * 0.24;
          meteorTrail = [];
          meteorTimer = 260;
          showAlert('✨ あっ、流れ星！');
        }
      } else if (meteorMode === 'flying') {
        meteorHopTimer = 0;
        meteorX += meteorVX;
        meteorY += meteorVY;
        if (meteorY < 16 || meteorY > 108) meteorVY *= -1;
        meteorTrail.push({ x: meteorX, y: meteorY });
        if (meteorTrail.length > 6) meteorTrail.shift();
        targetX = meteorX;
        targetY = meteorY;
        meteorTimer--;
        if (Math.hypot(posX - meteorX, posY - meteorY) < 10) {
          meteorMode = 'burst';
          meteorTimer = 32;
          mood = Math.min(100, mood + 2);
          for (let i = 0; i < 12; i++) {
            particles.push({
              x: meteorX,
              y: meteorY,
              vx: (Math.random() - 0.5) * 1.8,
              vy: (Math.random() - 0.5) * 1.8,
              life: 16 + Math.floor(Math.random() * 16),
              color: ['#fef08a', '#fde68a', '#bae6fd', '#ffffff'][Math.floor(Math.random() * 4)]
            });
          }
          playSE('pet');
          showAlert('🌟 つかまえた！ 星がきらきら！');
        } else if (meteorTimer <= 0 || meteorX < 3 || meteorX > 125) {
          meteorMode = 'waiting';
          meteorNextEvent = 300 + Math.floor(Math.random() * 360);
          meteorTrail = [];
        }
      } else if (meteorMode === 'burst') {
        targetX = meteorX;
        targetY = meteorY;
        meteorTimer--;
        if (meteorTimer <= 0) {
          meteorMode = 'waiting';
          meteorNextEvent = 300 + Math.floor(Math.random() * 360);
          meteorTrail = [];
        }
      }
    } else if (meteorMode !== 'idle') {
      meteorMode = 'idle';
      meteorTrail = [];
    }

    if (isSulking) {
      targetX = 104;
      targetY = 104;
    } else if (activeToy === 'meteorLamp' && meteorMode === 'flying') {
      // 流星を自分から追いかける
      targetX = meteorX;
      targetY = meteorY;
    } else if (activeToy === 'meteorLamp' && meteorMode === 'burst') {
      targetX = meteorX;
      targetY = meteorY;
    } else if (activeToy === 'waterMirror') {
      if (mirrorMode === 'peek') {
        targetX = toyX + 10;
        targetY = toyY + 8;
      } else if (mirrorMode === 'startled') {
        targetX = toyX - 23;
        targetY = toyY + 10;
      } else {
        targetX = toyX - 13 + (mirrorMode === 'tilt' ? mirrorDirection * 3 : 0);
        targetY = toyY + 5;
      }
    } else if (activeToy) {
      targetX = toyX;
      targetY = toyY;
    } else if (foods.length > 0) {
      targetX = foods[0].x;
      targetY = foods[0].y;
    } else if (Math.random() < 0.01) {
      targetX = 20 + Math.random() * 88;
      targetY = 20 + Math.random() * 88;
    }

    const meteorPlayingNearby = activeToy === 'meteorLamp' && meteorMode === 'waiting';
    vx = vx * (meteorPlayingNearby ? 0.86 : 0.92) + (targetX - posX) * (meteorPlayingNearby ? 0.012 : 0.006);
    vy = vy * (meteorPlayingNearby ? 0.86 : 0.92) + (targetY - posY) * (meteorPlayingNearby ? 0.012 : 0.006);

    posX += vx;
    posY += vy;

    for (let i = foods.length - 1; i >= 0; i--) {
      const f = foods[i];
      if (Math.hypot(posX - f.x, posY - f.y) < 12) {
        foods.splice(i, 1);
        satiety = Math.min(100, satiety + 25);
        playSE('feed');
        addHeartParticle(f.x, f.y);
        showAlert("パクッ！ (おなか +25)");
      }
    }

    if (activeToy && Math.hypot(posX - toyX, posY - toyY) < 18) {
      mood = Math.min(100, mood + 0.8);
      if (Math.random() < 0.15) {
        addHeartParticle(toyX, toyY);
      }
    }
  }

  /* ------------------------------------------
     進化タイミング & 演出処理
     ------------------------------------------ */
  // 進化先はお世話の回数に左右されず、3種類から均等な確率で選ぶ。
  function getCareType() {
    const types = ['puku', 'sui', 'fuwa'];
    return types[Math.floor(Math.random() * types.length)];
  }

  function typeName(type) {
    return ({ puku: 'ぷくぷく系', sui: 'すいすい系', fuwa: 'ふわふわ系' })[type] || 'ぷくぷく系';
  }

  function triggerEvolveCutin(nextStage) {
    if (isEvolving) return;
    initAudio();
    playSE('evolve');
    isEvolving = true;
    // 演出表示と実際の進化先がずれないよう、最初に1回だけ抽選する。
    const nextType = getCareType();
    evolveText = nextStage === 1 ? 'キッズ期へ進化！' : `${typeName(nextType)}に進化！`;

    setTimeout(() => {
      branchType = nextType;
      stage = nextStage;
      if (nextStage === 2 && !discoveredTypes.includes(branchType)) {
        discoveredTypes = [...discoveredTypes, branchType];
      }
    }, 1200);

    setTimeout(() => {
      isEvolving = false;
      showAlert(nextStage === 1 ? '✨ キッズ期に成長したよ！' : `✨ ${typeName(branchType)}の大人に進化したよ！`);
      saveData();
    }, 3200);
  }

  function checkEvolution() {
    if (isEvolving) return;
    const totalCare = petCareCount + feedCareCount + playCareCount;

    // 時間だけでなく、お世話も一定回数していると成長する。
    if (stage === 0 && aliveSeconds >= 600 && totalCare >= 3) {
      triggerEvolveCutin(1);
    } else if (stage === 1 && aliveSeconds >= 1800 && totalCare >= 8) {
      triggerEvolveCutin(2);
    }
  }

  function startNextGeneration() {
    if (stage !== 2) return;
    showGenerationChoice = false;
    showGenerationPanel = false;
    aliveSeconds = 0;
    generation += 1;
    stage = 0;
    branchType = 'puku';
    petCount = 0;
    petCareCount = 0;
    feedCareCount = 0;
    playCareCount = 0;
    mood = 80;
    satiety = 80;
    cleanliness = 100;
    dirtPatches = [];
    dirtTimer = 0;
    foods = [];
    particles = [];
    isSquished = false;
    isSulking = false;
    posX = 64;
    posY = 64;
    saveData();
    showAlert('🥚 新しいたまごを迎えたよ！');
  }

  function addHeartParticle(x, y) {
    for(let i=0; i<3; i++) {
      particles.push({
        x: x + (Math.random()-0.5)*6,
        y: y + (Math.random()-0.5)*6,
        vx: (Math.random()-0.5)*0.3,
        vy: -Math.random()*0.4 - 0.1,
        life: 25, color: '#f43f5e'
      });
    }
  }

  function drawPixelSprite(targetCtx, spriteData, startX, startY, size) {
    for(let y=0; y<size; y++) {
      for(let x=0; x<size; x++) {
        const char = spriteData[y]?.[x];
        if(char && P[char] && P[char] !== "transparent") {
          targetCtx.fillStyle = P[char];
          targetCtx.fillRect(Math.floor(startX + x), Math.floor(startY + y), 1, 1);
        }
      }
    }
  }

  function render() {
    if (!ctx) return;
    ctx.clearRect(0, 0, 128, 128);

    const bgGrad = ctx.createLinearGradient(0, 0, 0, 128);
    if (isNight) {
      bgGrad.addColorStop(0, '#030712');
      bgGrad.addColorStop(1, '#0b1528');
    } else {
      bgGrad.addColorStop(0, '#0c2a4a');
      bgGrad.addColorStop(1, '#051329');
    }
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, 128, 128);

    ctx.fillStyle = "rgba(255, 255, 255, 0.2)";
    bubbles.forEach(b => {
      b.y -= b.speed;
      if (b.y < -5) { b.y = 130; b.x = Math.random() * 128; }
      ctx.beginPath();
      ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
      ctx.fill();
    });

    if (activeToy) {
      if (activeToy === 'ball') {
        ctx.fillStyle = '#f43f5e';
        ctx.beginPath();
        ctx.arc(toyX, toyY, 4, 0, Math.PI * 2);
        ctx.fill();
      } else if (activeToy === 'ring') {
        ctx.fillStyle = '#ef4444';
        ctx.beginPath();
        ctx.arc(toyX, toyY, 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(Math.floor(toyX - 6), Math.floor(toyY - 1), 12, 2);
        ctx.fillRect(Math.floor(toyX - 1), Math.floor(toyY - 6), 2, 12);
        ctx.fillStyle = '#061126';
        ctx.beginPath();
        ctx.arc(toyX, toyY, 3, 0, Math.PI * 2);
        ctx.fill();
      } else if (activeToy === 'bear') {
        const bx = Math.floor(toyX);
        const by = Math.floor(toyY);
        ctx.fillStyle = '#92400e';
        ctx.fillRect(bx - 4, by - 5, 2, 2);
        ctx.fillRect(bx + 2, by - 5, 2, 2);
        ctx.fillStyle = '#b45309';
        ctx.fillRect(bx - 3, by - 4, 6, 5);
        ctx.fillRect(bx - 3, by + 1, 6, 4);
        ctx.fillStyle = '#fde68a';
        ctx.fillRect(bx - 1, by - 2, 2, 2);
        ctx.fillStyle = '#111827';
        ctx.fillRect(bx - 2, by - 3, 1, 1);
        ctx.fillRect(bx + 1, by - 3, 1, 1);
        ctx.fillRect(bx, by - 2, 1, 1);
      } else if (activeToy === 'star') {
        const sx = Math.floor(toyX);
        const sy = Math.floor(toyY);
        ctx.fillStyle = '#facc15';
        ctx.fillRect(sx - 1, sy - 4, 3, 9);
        ctx.fillRect(sx - 4, sy - 1, 9, 3);
        ctx.fillStyle = '#fef08a';
        ctx.fillRect(sx - 1, sy - 1, 3, 3);
      } else if (activeToy === 'chest') {
        const cx = Math.floor(toyX);
        const cy = Math.floor(toyY);
        ctx.fillStyle = '#854d0e';
        ctx.fillRect(cx - 5, cy - 3, 11, 7);
        ctx.fillStyle = '#eab308';
        ctx.fillRect(cx - 5, cy - 3, 11, 2);
        ctx.fillRect(cx - 1, cy, 3, 2);
      } else if (activeToy === 'submarine') {
        // 既存の画面に合わせた小さなドット風潜水艇
        const sx = Math.floor(toyX);
        const sy = Math.floor(toyY);
        ctx.fillStyle = '#fbbf24';
        ctx.fillRect(sx - 8, sy - 3, 15, 6);
        ctx.fillRect(sx - 5, sy - 5, 9, 2);
        ctx.fillRect(sx - 3, sy - 7, 5, 2);
        ctx.fillStyle = '#d97706';
        ctx.fillRect(sx - 7, sy + 3, 13, 1);
        ctx.fillRect(sx + 7, sy - 1, 3, 2);
        ctx.fillStyle = '#7dd3fc';
        ctx.fillRect(sx - 4, sy - 2, 3, 3);
        ctx.fillRect(sx + 1, sy - 2, 3, 3);
        ctx.fillStyle = '#e0f2fe';
        ctx.fillRect(sx - 3, sy - 2, 1, 1);
        ctx.fillRect(sx + 2, sy - 2, 1, 1);

        // 後ろから小さな泡を出す
        if (submarineMode === 'exploring' && submarineTravelTimer % 14 < 7) {
          ctx.fillStyle = 'rgba(125, 211, 252, 0.85)';
          ctx.fillRect(sx - submarineDirection * 11, sy - 2, 2, 2);
          ctx.fillRect(sx - submarineDirection * 14, sy + 2, 1, 1);
        }

        // 事件ごとの視覚演出
        if (submarineEventTimer > 0 && submarineEvent) {
          if (submarineEvent === 'shadow') {
            ctx.fillStyle = 'rgba(3, 7, 18, 0.75)';
            ctx.fillRect(sx + 15, sy - 10, 7, 3);
            ctx.fillRect(sx + 18, sy - 7, 4, 2);
          } else if (submarineEvent === 'bubbles') {
            ctx.strokeStyle = '#bae6fd';
            ctx.lineWidth = 1;
            for (let i = 0; i < 5; i++) {
              ctx.beginPath();
              ctx.arc(sx + (i - 2) * 4, sy - 12 - (i % 2) * 3, 2, 0, Math.PI * 2);
              ctx.stroke();
            }
          } else if (submarineEvent === 'fish') {
            ctx.fillStyle = '#f9a8d4';
            ctx.fillRect(sx + 15, sy - 4, 5, 3);
            ctx.fillRect(sx + 20, sy - 3, 2, 1);
            ctx.fillRect(sx + 13, sy - 5, 2, 5);
          } else if (submarineEvent === 'current') {
            ctx.fillStyle = '#7dd3fc';
            ctx.fillRect(sx - 13, sy - 8, 5, 1);
            ctx.fillRect(sx - 11, sy - 6, 5, 1);
            ctx.fillRect(sx - 13, sy - 4, 5, 1);
          }
        }

        if (submarineMode === 'startled' || submarineReactionTimer > 0) {
          ctx.fillStyle = '#fef08a';
          ctx.fillRect(sx + 9, sy - 10, 2, 5);
          ctx.fillRect(sx + 12, sy - 7, 2, 2);
        }
      } else if (activeToy === 'meteorLamp') {
        // ランプ本体：既存の128×128キャンバス内に収まる小さなドット絵
        const lx = Math.floor(toyX);
        const ly = Math.floor(toyY);
        ctx.fillStyle = '#334155';
        ctx.fillRect(lx - 4, ly + 2, 8, 3);
        ctx.fillStyle = '#64748b';
        ctx.fillRect(lx - 3, ly - 3, 6, 6);
        ctx.fillStyle = '#facc15';
        ctx.fillRect(lx - 2, ly - 5, 4, 4);
        ctx.fillStyle = '#fef3c7';
        ctx.fillRect(lx - 1, ly - 4, 2, 2);
        // 待機中もランプがゆっくり瞬き、設置していることが伝わる
        if (Math.floor(Date.now() / 350) % 2 === 0) {
          ctx.fillStyle = 'rgba(250, 204, 21, 0.45)';
          ctx.fillRect(lx - 6, ly - 9, 12, 1);
          ctx.fillRect(lx - 8, ly - 7, 1, 5);
          ctx.fillRect(lx + 7, ly - 7, 1, 5);
        }
        // 流星のしっぽ
        meteorTrail.forEach((point, index) => {
          ctx.fillStyle = `rgba(253, 224, 71, ${0.12 + index * 0.1})`;
          ctx.fillRect(Math.floor(point.x), Math.floor(point.y), 2, 2);
        });
        if (meteorMode === 'flying' || meteorMode === 'burst') {
          const mx = Math.floor(meteorX);
          const my = Math.floor(meteorY);
          ctx.fillStyle = '#facc15';
          ctx.fillRect(mx - 1, my - 4, 3, 9);
          ctx.fillRect(mx - 4, my - 1, 9, 3);
          ctx.fillStyle = '#fff7ae';
          ctx.fillRect(mx - 1, my - 1, 3, 3);
          if (meteorMode === 'burst') {
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(mx - 7, my - 5, 2, 2);
            ctx.fillRect(mx + 6, my - 4, 2, 2);
            ctx.fillRect(mx - 5, my + 5, 2, 2);
            ctx.fillRect(mx + 4, my + 5, 2, 2);
          }
        }
      } else if (activeToy === 'waterMirror') {
        // 水鏡：青緑の枠と、ミナモを思わせる小さな反射像
        const mx = Math.floor(toyX);
        const my = Math.floor(toyY);
        ctx.fillStyle = '#334155';
        ctx.fillRect(mx - 7, my - 11, 14, 22);
        ctx.fillStyle = '#c084fc';
        ctx.fillRect(mx - 6, my - 10, 12, 20);
        ctx.fillStyle = '#a5f3fc';
        ctx.fillRect(mx - 4, my - 8, 8, 16);
        ctx.fillStyle = '#e0f2fe';
        ctx.fillRect(mx - 3, my - 6, 6, 12);
        // 反射像がきらりと光る
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(mx - 3, my - 6, 2, 2);
        ctx.fillRect(mx + 2, my + 2, 1, 3);
        // 枠の足
        ctx.fillStyle = '#64748b';
        ctx.fillRect(mx - 5, my + 11, 10, 2);
        ctx.fillRect(mx - 2, my + 9, 4, 3);
        // 見つめている時は鏡の上に小さなきらめき
        if (mirrorMode === 'watch' || mirrorMode === 'tilt') {
          ctx.fillStyle = '#fef08a';
          ctx.fillRect(mx + 8, my - 9, 2, 2);
          if (mirrorMode === 'tilt') ctx.fillRect(mx - 10, my - 4, 2, 2);
        }
        if (mirrorMode === 'startled') {
          ctx.fillStyle = '#fef08a';
          ctx.fillRect(mx + 8, my - 13, 2, 4);
          ctx.fillRect(mx + 12, my - 9, 2, 2);
        }
      }
    }

    ctx.fillStyle = "#fbbf24";
    for(let i = foods.length - 1; i >= 0; i--) {
      ctx.fillRect(Math.floor(foods[i].x - 2), Math.floor(foods[i].y - 2), 4, 4);
    }

    // トイレの汚れ。暗い背景でも見つけやすい、にごった黄緑色の泡のかたまり
    dirtPatches.forEach(dirt => {
      const x = Math.floor(dirt.x);
      const y = Math.floor(dirt.y);

      // 汚れの中心位置はそのままに、見た目だけ70%に縮小する
      ctx.save();
      ctx.translate(x * 0.3, y * 0.3);
      ctx.scale(0.7, 0.7);

      // うっすらした輪郭で「ここをタップ」と分かりやすくする
      ctx.fillStyle = 'rgba(210, 220, 145, 0.18)';
      ctx.fillRect(x - 9, y - 7, 18, 14);
      ctx.fillRect(x - 7, y - 9, 14, 18);

      // モヤモヤした汚れの本体（黒ではなく、濁ったオリーブ色）
      ctx.fillStyle = '#626b43';
      ctx.fillRect(x - 6, y - 2, 12, 6);
      ctx.fillRect(x - 4, y - 5, 8, 10);
      ctx.fillRect(x - 2, y - 7, 4, 2);
      ctx.fillRect(x - 8, y, 3, 3);
      ctx.fillRect(x + 5, y - 1, 4, 3);

      // 泡の明るい縁とハイライト
      ctx.fillStyle = '#a3ad69';
      ctx.fillRect(x - 4, y - 4, 4, 2);
      ctx.fillRect(x + 1, y - 3, 3, 2);
      ctx.fillRect(x - 5, y + 2, 3, 2);
      ctx.fillStyle = '#e0d99a';
      ctx.fillRect(x - 3, y - 3, 2, 2);
      ctx.fillRect(x + 2, y - 2, 1, 1);

      // 汚れのまわりに小さな泡を浮かべる
      ctx.fillStyle = '#cbd5a0';
      ctx.fillRect(x - 7, y - 8, 2, 2);
      ctx.fillRect(x + 5, y - 7, 2, 2);
      ctx.fillRect(x + 7, y + 4, 2, 2);

      ctx.restore();
    });

    const spr = getCurrentSprite();
    const spriteX = Math.floor(posX - spr.size / 2);
    const meteorHopHeight = activeToy === 'meteorLamp' && meteorMode === 'waiting' && meteorHopTimer > 0
      ? Math.sin((meteorHopTimer / 30) * Math.PI) * 4
      : 0;
    const spriteY = Math.floor(posY - spr.size / 2 - meteorHopHeight);
    drawPixelSprite(ctx, spr.sprite, spriteX, spriteY, spr.size);

    // 瞬き中は目の部分だけを閉じた線に見せる。画面・元のドット絵データは変更しない。
    if (blinkFrames > 0 && !isSquished && !isSulking) {
      ctx.fillStyle = '#38bdf8';
      if (spr.size === 16) {
        ctx.fillRect(spriteX + 5, spriteY + 5, 2, 2);
        ctx.fillRect(spriteX + 9, spriteY + 5, 2, 2);
        ctx.fillStyle = '#111f28';
        ctx.fillRect(spriteX + 5, spriteY + 6, 2, 1);
        ctx.fillRect(spriteX + 9, spriteY + 6, 2, 1);
      } else {
        ctx.fillRect(spriteX + 7, spriteY + 5, 3, 2);
        ctx.fillRect(spriteX + 13, spriteY + 5, 3, 2);
        ctx.fillStyle = '#111f28';
        ctx.fillRect(spriteX + 7, spriteY + 6, 3, 1);
        ctx.fillRect(spriteX + 13, spriteY + 6, 3, 1);
      }
    }

    for(let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.x += p.vx; p.y += p.vy; p.life--;
      ctx.fillStyle = p.color;
      ctx.fillRect(Math.floor(p.x), Math.floor(p.y), 2, 2);
      if (p.life <= 0) particles.splice(i, 1);
    }
  }

  function handleFeed() {
    initAudio();
    if (satiety >= 100) {
      showAlert("お腹がいっぱいです！");
      return;
    }
    feedCareCount++;
    const offsetX = vx >= 0 ? 12 : -12;
    foods = [{ x: Math.max(10, Math.min(118, posX + offsetX)), y: posY }];
    saveData();
  }

  function handlePet() {
    initAudio();
    petCount++;
    petCareCount++;
    mood = Math.min(100, mood + 5);

    tapCounter++;
    clearTimeout(tapResetTimer);
    tapResetTimer = setTimeout(() => { tapCounter = 0; }, 1000);

    if (tapCounter >= 5 && !isSquished) {
      isSquished = true;
      squishTimer = 0;
      posX = 64; posY = 64;
      playSE('squish');
      showAlert("ガラスにピタッ！");
      tapCounter = 0;
    } else {
      playSE('pet');
      addHeartParticle(posX, posY);
    }
  }

  function handleAquariumClick(event) {
    // クリック位置を、水槽キャンバスの128×128座標に変換する
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width * 128;
    const y = (event.clientY - rect.top) / rect.height * 128;

    // 汚れをタップした場合は、なでる動作を発生させずに片付ける
    const hitIndex = dirtPatches.findIndex(dirt => {
      const dx = x - dirt.x;
      const dy = y - dirt.y;
      return Math.sqrt(dx * dx + dy * dy) <= 12;
    });

    if (hitIndex !== -1) {
      initAudio();
      const dirt = dirtPatches[hitIndex];
      dirtPatches = dirtPatches.filter((_, index) => index !== hitIndex);
      for (let i = 0; i < 8; i++) {
        particles.push({
          x: dirt.x + (Math.random() - 0.5) * 12,
          y: dirt.y + (Math.random() - 0.5) * 12,
          vx: (Math.random() - 0.5) * 1.2,
          vy: (Math.random() - 0.5) * 1.2,
          life: 12 + Math.floor(Math.random() * 8),
          color: '#67e8f9'
        });
      }
      playSE('clean');
      showAlert('汚れを片付けたよ！');
      saveData();
      return;
    }

    if (activeToy === 'waterMirror' && Math.hypot(x - toyX, y - toyY) < 18) {
      handlePet();
      mirrorMode = 'startled';
      mirrorTimer = 0;
      playSE('squish');
      for (let i = 0; i < 8; i++) {
        particles.push({
          x: toyX + (Math.random() - 0.5) * 12,
          y: toyY + (Math.random() - 0.5) * 12,
          vx: (Math.random() - 0.5) * 1.1,
          vy: (Math.random() - 0.5) * 1.1,
          life: 14 + Math.floor(Math.random() * 12),
          color: ['#e9d5ff', '#a5f3fc', '#ffffff'][Math.floor(Math.random() * 3)]
        });
      }
      showAlert('😳 鏡の中の自分にびっくり！');
      return;
    }

    if (activeToy === 'submarine' && submarineMode === 'exploring') {
      handlePet();
      submarineMode = 'startled';
      submarineReactionTimer = 55;
      submarineEvent = '';
      submarineEventTimer = 0;
      submarineDirection *= -1;
      playSE('squish');
      for (let i = 0; i < 10; i++) {
        particles.push({
          x: toyX + (Math.random() - 0.5) * 14,
          y: toyY + (Math.random() - 0.5) * 10,
          vx: (Math.random() - 0.5) * 1.4,
          vy: (Math.random() - 0.5) * 1.4,
          life: 18 + Math.floor(Math.random() * 12),
          color: '#7dd3fc'
        });
      }
      showAlert('びっくり！ 潜水艇が急旋回！');
      return;
    }

    handlePet();
  }

  function handleClean() {
    initAudio();
    cleanliness = 100;
    mood = Math.min(100, mood + 5);
    playSE('clean');
    showAlert("水槽が綺麗になった！（きれいさ100% / ご機嫌+5）");
    saveData();
  }

  function handlePlayWithToy(toy) {
    initAudio();
    if (activeToy === toy) {
      activeToy = null;
      if (toy === 'submarine') {
        submarineMode = 'idle';
        submarineEvent = '';
        submarineEventTimer = 0;
        submarineReactionTimer = 0;
      }
      if (toy === 'meteorLamp') {
        meteorMode = 'idle';
        meteorTrail = [];
        meteorWanderTimer = 0;
        meteorHopTimer = 0;
      }
      if (toy === 'waterMirror') {
        mirrorMode = 'idle';
        mirrorTimer = 0;
      }
      showAlert("おもちゃを片付けました");
      return;
    }
    activeToy = toy;
    playCareCount++;
    toyX = 30 + Math.random() * 68;
    toyY = 30 + Math.random() * 68;
    mood = Math.min(100, mood + 20);
    playSE('pet');
    if (toy === 'waterMirror') {
      mirrorMode = 'approach';
      mirrorTimer = 0;
    } else if (toy === 'meteorLamp') {
      meteorMode = 'waiting';
      meteorTrail = [];
      meteorNextEvent = 240 + Math.floor(Math.random() * 240);
      meteorTimer = 0;
      meteorWanderX = toyX + (Math.random() - 0.5) * 16;
      meteorWanderY = toyY + 9 + (Math.random() - 0.5) * 16;
      meteorWanderTimer = 1;
      meteorHopTimer = 0;
    } else if (toy === 'submarine') {
      submarineMode = 'boarding';
      submarineEvent = '';
      submarineEventTimer = 0;
      submarineReactionTimer = 0;
      submarineTravelTimer = 0;
      submarineDirection = Math.random() < 0.5 ? -1 : 1;
      submarineNextEvent = 500 + Math.floor(Math.random() * 600);
      toyX = 28 + Math.random() * 72;
      toyY = 42 + Math.random() * 48;
    } else if (submarineMode !== 'idle') {
      submarineMode = 'idle';
      submarineEvent = '';
      submarineEventTimer = 0;
      submarineReactionTimer = 0;
    }
    if (toy !== 'waterMirror' && mirrorMode !== 'idle') {
      mirrorMode = 'idle';
      mirrorTimer = 0;
    }
    const toyName = toy === 'ball' ? 'ボール' : toy === 'ring' ? '浮き輪' : toy === 'bear' ? 'ぬいぐるみ' : toy === 'star' ? 'お星さま' : toy === 'submarine' ? 'ぷかぷか潜水艇' : toy === 'meteorLamp' ? 'きらきら流星ランプ' : toy === 'waterMirror' ? 'まねっこ水鏡' : 'たからばこ';
    showAlert(toy === 'submarine' ? '🚤 潜水艇を出したよ！乗り込むのを待とう。' : toy === 'meteorLamp' ? '✨ 流星ランプを置いたよ。流れ星を待とう！' : toy === 'waterMirror' ? '🪞 水鏡を置いたよ。ミナモが気づくのを待とう！' : `${toyName}を出したよ！(ご機嫌+20)`);
  }

  function handleReset() {
    if (confirm("データをリセットしますか？")) {
      localStorage.removeItem('minamo_save_v3');

      // 基本データの初期化
      aliveSeconds = 0;
      coins = 50;
      stage = 0;
      branchType = 'puku';
      
      // メーターをすべてゼロに初期化
      mood = 0;
      satiety = 0;
      cleanliness = 0;
      
      petCount = 0;
      petCareCount = 0;
      feedCareCount = 0;
      playCareCount = 0;
      discoveredTypes = [];
      generation = 1;
      showDex = false;
      showGenerationChoice = false;
      inventory = ['ball'];
      dirtPatches = [];
      dirtTimer = 0;
      nextDirtAt = 300 + Math.floor(Math.random() * 181);
      activeToy = null;
      submarineMode = 'idle';
      submarineEvent = '';
      submarineEventTimer = 0;
      submarineReactionTimer = 0;
      submarineTravelTimer = 0;
      submarineDirection = 1;
      submarineNextEvent = 700 + Math.floor(Math.random() * 500);
      meteorMode = 'idle';
      meteorX = 18;
      meteorY = 24;
      meteorVX = 0.45;
      meteorVY = 0.12;
      meteorTimer = 0;
      meteorNextEvent = 240 + Math.floor(Math.random() * 240);
      meteorTrail = [];
      mirrorMode = 'idle';
      mirrorTimer = 0;
      mirrorDirection = 1;
      foods = [];
      particles = [];
      isSquished = false;
      isSulking = false;
      isEvolving = false;
      posX = 64;
      posY = 64;
      vx = 0;
      vy = 0;

      saveData();
      showAlert("データをリセット！ベビー期（メーター0）からスタートします！");
    }
  }

  let gState = $state({ x: 64, items: [], score: 0, timer: 30, active: false, ready: false });
  let gAnimId, gTimerId, gKeyHandler;

  function openGame() {
    initAudio();
    showGameModal = true;
    gState = { x: 64, items: [], score: 0, timer: 30, active: false, ready: false };
    setTimeout(initMiniGameCanvas, 50);
  }

  function initMiniGameCanvas() {
    if (!gameCanvasEl) return;
    gctx = gameCanvasEl.getContext('2d');
    // 内部解像度は高くしつつ、ゲーム内の座標は従来どおり128×128で扱う
    gctx.setTransform(4, 0, 0, 4, 0, 0);
    gctx.fillStyle = '#061126';
    gctx.fillRect(0, 0, 128, 128);
    gctx.fillStyle = '#38bdf8';
    gctx.font = '10px monospace';
    gctx.fillText("TAP START TO PLAY", 12, 64);
  }

  function startMiniGame() {
    if (!gameCanvasEl) return;
    gctx = gameCanvasEl.getContext('2d');
    // 再スタート時にも拡大率が重ならないように固定する
    gctx.setTransform(4, 0, 0, 4, 0, 0);
    gState = { x: 64, items: [], score: 0, timer: 30, active: true, ready: true };
    let frame = 0;

    clearInterval(gTimerId);
    cancelAnimationFrame(gAnimId);

    gTimerId = setInterval(() => {
      if (!gState.active) return;
      gState.timer--;
      if (gState.timer <= 0) {
        endMiniGame("タイムアップ！");
      }
    }, 1000);

    const handleKeyDown = (e) => {
      if (!gState.active) return;
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        movePlayer(-12);
      }
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        movePlayer(12);
      }
    };
    gKeyHandler = handleKeyDown;
    window.addEventListener('keydown', handleKeyDown);

    function gameLoop() {
      if (!gState.active) {
        window.removeEventListener('keydown', handleKeyDown);
        return;
      }
      frame++;

      if (frame % 30 === 0) {
        const isBomb = Math.random() < 0.2;
        gState.items.push({
          x: 10 + Math.random() * 108,
          y: -10,
          type: isBomb ? 'bomb' : 'rice',
          speed: 0.8 + Math.random() * 0.6
        });
      }

      gctx.fillStyle = '#061126';
      gctx.fillRect(0, 0, 128, 128);

      for (let i = gState.items.length - 1; i >= 0; i--) {
        const item = gState.items[i];
        item.y += item.speed;

        if (item.type === 'rice') {
          gctx.fillStyle = '#ffffff';
          gctx.beginPath();
          gctx.arc(item.x, item.y, 4, 0, Math.PI * 2);
          gctx.fill();
          gctx.fillStyle = '#111827';
          gctx.fillRect(item.x - 2, item.y, 4, 3);
        } else {
          gctx.fillStyle = '#ef4444';
          gctx.beginPath();
          gctx.arc(item.x, item.y, 4, 0, Math.PI * 2);
          gctx.fill();
        }

        if (Math.hypot(item.x - gState.x, item.y - 104) < 14) {
          if (item.type === 'rice') {
            gState.score += 10;
            playSE('feed');
          } else {
            playSE('squish');
            window.removeEventListener('keydown', handleKeyDown);
            endMiniGame("ゴミに当たっちゃった！");
            return;
          }
          gState.items.splice(i, 1);
          continue;
        }

        if (item.y > 135) {
          gState.items.splice(i, 1);
        }
      }

      const spr = getCurrentSprite();
      drawPixelSprite(gctx, spr.sprite, gState.x - spr.size / 2, 104 - spr.size / 2, spr.size);

      gctx.fillStyle = '#fff';
      gctx.font = '9px monospace';
      gctx.fillText("SCORE: " + gState.score, 6, 12);
      gctx.fillText("TIME: " + gState.timer + "s", 80, 12);

      gAnimId = requestAnimationFrame(gameLoop);
    }
    gameLoop();
  }

  function movePlayer(dir) {
    if (!gState.active) return;
    gState.x = Math.max(14, Math.min(114, gState.x + dir));
  }

  function handleGameTap(event) {
    if (!gState.active) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const tapX = event.clientX - rect.left;

    if (tapX < rect.width / 2) {
      movePlayer(-16);
    } else {
      movePlayer(16);
    }
  }

  function endMiniGame(reason = "") {
    if (!gState.active) return;

    gState.active = false;
    clearInterval(gTimerId);
    cancelAnimationFrame(gAnimId);

    // タイムアップまで生き残れたら、スコア分に加えてクリアボーナスを渡す
    const cleared = reason === "タイムアップ！";
    const bonusCoins = cleared ? 30 : 0;
    const earnedCoins = gState.score + bonusCoins;

    if (gKeyHandler) {
      window.removeEventListener('keydown', gKeyHandler);
      gKeyHandler = null;
    }

    coins += earnedCoins;
    mood = Math.min(100, mood + 15);
    saveData();

    const bonusMessage = cleared ? `\nクリアボーナス: +${bonusCoins} コイン！` : "";
    alert(`${reason}\nスコア: ${gState.score}点${bonusMessage}\n🪙 合計 +${earnedCoins} コイン獲得！`);
    showGameModal = false;
  }

  function buyToy(toyId, cost) {
    initAudio();
    if (coins < cost) {
      showAlert("コインが足りません！");
      return;
    }
    coins -= cost;
    inventory = [...inventory, toyId];
    playSE('buy');
    showAlert("おもちゃを購入しました！");
    saveData();
  }
</script>

<main class="app-container">
  <header>
    <h1><span>🫧</span> Minamo</h1>
    <div class="header-controls">
      <div class="coin-badge">🪙 {coins}</div>
      <button class="icon-btn" onclick={() => isNight = !isNight}>🌙 昼夜</button>
      <button class="icon-btn" onclick={handleReset}>🔄 リセット</button>
    </div>
  </header>

  {#if alertMsg}
    <div class="toast-alert">{alertMsg}</div>
  {/if}

  <div class="aquarium-card">
    <div class="canvas-wrapper" onclick={handleAquariumClick} role="button" tabindex="0" onkeydown={(e) => e.key === 'Enter' && handlePet()}>
      <canvas bind:this={canvasEl} width="128" height="128"></canvas>
      <div class="status-overlay">
        <div class="badge">{branchText}</div>
      </div>
      
      {#if isSulking}
        <div class="sulking-msg">⋯⋯(画面の隅っこでいじけている)</div>
      {/if}

      <!-- 進化カットイン演出オーバーレイ -->
      {#if isEvolving}
        <div class="evolve-overlay">
          <div class="evolve-flash"></div>
          <div class="evolve-exclamation">！！</div>
          <div class="evolve-banner">{evolveText}</div>
        </div>
      {/if}
    </div>
  </div>

    <div class="stats-panel">
    <div class="stat-item">
      <div class="stat-label"><span>ごはん</span><span>{Math.round(satiety)}%</span></div>
      <div class="bar-bg"><div class="bar-fill satiety" style="width: {satiety}%"></div></div>
    </div>
    <div class="stat-item">
      <div class="stat-label"><span>ごきげん</span><span>{Math.round(mood)}%</span></div>
      <div class="bar-bg"><div class="bar-fill mood" style="width: {mood}%"></div></div>
    </div>
    <div class="stat-item toilet-stat">
      <div class="stat-label"><span>トイレ</span><span>{Math.max(0, 100 - dirtPatches.length * 50)}%</span></div>
      <div class="bar-bg"><div class="bar-fill toilet" style="width: {Math.max(0, 100 - dirtPatches.length * 50)}%"></div></div>
      <div class="toilet-status" class:dirty={dirtPatches.length > 0}>
        <span class="toilet-dot"></span>
        {dirtPatches.length > 0 ? '汚れあり' : 'きれい'}
      </div>
    </div>
  </div>


  <div class="action-grid">
    <button class="btn-action" onclick={handleFeed}>
      <span class="icon">🍱</span><span>ごはん</span>
    </button>
    <button class="btn-action" onclick={handlePet}>
      <span class="icon">✋</span><span>なでる</span>
    </button>
    <button class="btn-action" onclick={() => showStoreModal = true}>
      <span class="icon">🛍️</span><span>ストア</span>
    </button>
    <button class="btn-action" onclick={() => showGamesModal = true}>
      <span class="icon">🎮</span><span>ゲーム</span>
    </button>
  </div>

  <div class="toy-shelf">
    <div class="shelf-title">🧸 持っているおもちゃ（タップで出す）:</div>
    <div class="toy-buttons">
      {#each inventory as toy}
        <button class="toy-btn" class:active={activeToy === toy} onclick={() => handlePlayWithToy(toy)}>
          {toy === 'ball' ? '🔴 ボール' : toy === 'ring' ? '⭕ 浮き輪' : toy === 'bear' ? '🧸 くま' : toy === 'star' ? '🌟 スター' : toy === 'submarine' ? '🚤 潜水艇' : toy === 'meteorLamp' ? '✨ 流星ランプ' : toy === 'waterMirror' ? '🪞 水鏡' : '🐚 たからばこ'}
        </button>
      {/each}
    </div>
  </div>

  {#if stage === 2}
    {#if showGenerationPanel}
      <div class="generation-modal-backdrop" role="presentation" onclick={(event) => { if (event.target === event.currentTarget) showGenerationPanel = false; }}>
        <section class="evolution-panel generation-popup" role="dialog" aria-modal="true" aria-label="世代の確認">
          <button class="generation-popup-close" aria-label="閉じる" onclick={() => { showGenerationPanel = false; showGenerationChoice = false; }}>×</button>
          <div class="evolution-heading">🌱 第{generation}世代・大人になったよ！</div>
          <p>今の生き物と暮らし続けても、新しいたまごを迎えてもOK。</p>
          <div class="evolution-actions">
            <button class="evolution-button egg-button" onclick={() => showGenerationChoice = !showGenerationChoice}>🥚 次のたまご</button>
          </div>
          {#if showGenerationChoice}
            <div class="generation-confirm">
              <p>今の生き物は図鑑に記録されているよ。次の世代を始める？</p>
              <div class="evolution-actions">
                <button class="evolution-button" onclick={() => showGenerationChoice = false}>今の子と暮らす</button>
                <button class="evolution-button egg-button" onclick={startNextGeneration}>新しいたまごを迎える</button>
              </div>
            </div>
          {/if}
        </section>
      </div>
    {/if}
  {/if}

  <!-- 図鑑は大人になる前からいつでも開ける -->
  <section class="evolution-panel dex-panel">
    <div class="evolution-actions">
      <button class="evolution-button" onclick={() => showDex = !showDex}>📖 図鑑 {showDex ? 'を閉じる' : 'を見る'}</button>
      {#if stage === 2}
        <button class="generation-open-button" onclick={() => { showGenerationPanel = true; showGenerationChoice = false; }}>🌱 世代</button>
      {/if}
    </div>
    {#if showDex}
      <div class="dex-list">
        {#each ['puku', 'sui', 'fuwa'] as type}
          <div class="dex-entry" class:undiscovered={!discoveredTypes.includes(type)}>
            <span>{discoveredTypes.includes(type) ? '◆' : '◇'}</span>
            <span>{discoveredTypes.includes(type) ? typeName(type) : '？？？'}</span>
            <small>{discoveredTypes.includes(type) ? '発見済み' : 'まだ出会っていない'}</small>
          </div>
        {/each}
      </div>
    {/if}
  </section>
</main>

{#if showGamesModal}
  <div class="modal">
    <div class="modal-content">
      <h3 class="modal-title">🎮 ゲーム</h3>
      <button class="btn-start" onclick={() => { showGamesModal = false; openGame(); }}>🍙 おにぎりキャッチ</button>
      <button class="modal-close" onclick={() => showGamesModal = false}>閉じる</button>
    </div>
  </div>
{/if}

{#if showGameModal}
  <div class="modal">
    <div class="modal-content">
      <h3 class="modal-title">🍙 おにぎりキャッチ</h3>
      <div
        class="minigame-canvas-wrap"
        onpointerdown={handleGameTap}
        role="application"
        aria-label="おにぎりキャッチ。画面の左半分をタップすると左、右半分をタップすると右へ移動"
      >
        <canvas bind:this={gameCanvasEl} width="512" height="512"></canvas>
      </div>

      {#if !gState.ready}
        <p class="game-desc">落ちてくるおにぎりをキャッチしよう！<br>赤いゴミに当たるとゲーム終了！</p>
        <button class="btn-start" onclick={startMiniGame}>▶ スタート！</button>
      {:else}
        <div class="touch-controls">
          <button class="btn-move" onclick={() => movePlayer(-16)}>◀ ひだり</button>
          <button class="btn-move" onclick={() => movePlayer(16)}>みぎ ▶</button>
        </div>
      {/if}

      <button class="modal-close" onclick={() => { showGameModal = false; gState.active = false; clearInterval(gTimerId); cancelAnimationFrame(gAnimId); }}>閉じる</button>
    </div>
  </div>
{/if}

{#if showStoreModal}
  <div class="modal">
    <div class="modal-content">
      <h3 class="modal-title">🛍️ おもちゃストア</h3>
      <div class="store-coins">所持コイン: 🪙 {coins}</div>
      
      <div class="store-list">
        <div class="store-item">
          <span>⭕ ぷかぷか浮き輪</span>
          {#if inventory.includes('ring')}
            <button class="btn-bought" disabled>購入済み</button>
          {:else}
            <button class="btn-buy" onclick={() => buyToy('ring', 50)}>🪙 50で購入</button>
          {/if}
        </div>
        <div class="store-item">
          <span>🌟 お星さま</span>
          {#if inventory.includes('star')}
            <button class="btn-bought" disabled>購入済み</button>
          {:else}
            <button class="btn-buy" onclick={() => buyToy('star', 80)}>🪙 80で購入</button>
          {/if}
        </div>
        <div class="store-item">
          <span>🧸 ぬいぐるみ</span>
          {#if inventory.includes('bear')}
            <button class="btn-bought" disabled>購入済み</button>
          {:else}
            <button class="btn-buy" onclick={() => buyToy('bear', 100)}>🪙 100で購入</button>
          {/if}
        </div>
        <div class="store-item">
          <span>🐚 たからばこ</span>
          {#if inventory.includes('chest')}
            <button class="btn-bought" disabled>購入済み</button>
          {:else}
            <button class="btn-buy" onclick={() => buyToy('chest', 150)}>🪙 150で購入</button>
          {/if}
        </div>
        <div class="store-item">
          <span>🚤 ぷかぷか潜水艇（高級）</span>
          {#if inventory.includes('submarine')}
            <button class="btn-bought" disabled>購入済み</button>
          {:else}
            <button class="btn-buy" onclick={() => buyToy('submarine', 700)}>🪙 700で購入</button>
          {/if}
        </div>
        <div class="store-item">
          <span>✨ きらきら流星ランプ（高級）</span>
          {#if inventory.includes('meteorLamp')}
            <button class="btn-bought" disabled>購入済み</button>
          {:else}
            <button class="btn-buy" onclick={() => buyToy('meteorLamp', 600)}>🪙 600で購入</button>
          {/if}
        </div>
        <div class="store-item">
          <span>🪞 まねっこ水鏡（高級）</span>
          {#if inventory.includes('waterMirror')}
            <button class="btn-bought" disabled>購入済み</button>
          {:else}
            <button class="btn-buy" onclick={() => buyToy('waterMirror', 800)}>🪙 800で購入</button>
          {/if}
        </div>
      </div>

      <button class="modal-close" onclick={() => showStoreModal = false}>閉じる</button>
    </div>
  </div>
{/if}

<style>
  :global(html) {
    touch-action: manipulation;
  }

  :global(body) {
    touch-action: manipulation;
    margin: 0;
    padding: 12px;
    background: #0b1329;
    color: #f1f5f9;
    font-family: sans-serif;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    user-select: none;
  }

  .app-container {
    width: 100%;
    max-width: 420px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    position: relative;
  }

  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #132247;
    padding: 8px 14px;
    border-radius: 14px;
    border: 1px solid #1f3768;
  }

  h1 { margin: 0; font-size: 1rem; color: #38bdf8; }
  .header-controls { display: flex; gap: 6px; align-items: center; }
  .coin-badge { background: #1e293b; border: 1px solid #fbbf24; color: #fbbf24; padding: 4px 8px; border-radius: 12px; font-size: 0.8rem; font-weight: bold; }
  .icon-btn { background: #1e325c; border: 1px solid #1f3768; color: #fff; padding: 5px 8px; border-radius: 8px; cursor: pointer; font-size: 0.75rem; }

  .toast-alert {
    position: absolute;
    top: 50px;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(14, 165, 233, 0.95);
    color: #fff;
    padding: 6px 16px;
    border-radius: 20px;
    font-size: 0.8rem;
    z-index: 50;
    box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    pointer-events: none;
  }

  .aquarium-card {
    background: #132247;
    border-radius: 16px;
    padding: 10px;
    border: 2px solid #1f3768;
  }

  .canvas-wrapper {
    position: relative;
    width: 100%;
    aspect-ratio: 1;
    border-radius: 12px;
    overflow: hidden;
    background: #061126;
    border: 2px solid #1a2f53;
    cursor: pointer;
  }

  canvas { width: 100%; height: 100%; image-rendering: pixelated; display: block; }

  .status-overlay {
    position: absolute;
    top: 8px; left: 8px; right: 8px;
    display: flex; justify-content: space-between;
    pointer-events: none;
  }

  .badge {
    background: rgba(15, 23, 42, 0.8);
    padding: 3px 8px;
    border-radius: 20px;
    font-size: 0.7rem;
    border: 1px solid rgba(255, 255, 255, 0.1);
  }

  .sulking-msg {
    position: absolute; bottom: 12px; left: 50%;
    transform: translateX(-50%);
    background: rgba(15, 23, 42, 0.85);
    border: 1px solid #3b82f6; color: #93c5fd;
    padding: 4px 10px; border-radius: 10px; font-size: 0.7rem;
  }

  .evolve-overlay {
    position: absolute; inset: 0;
    background: rgba(3, 7, 18, 0.85);
    display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    z-index: 20;
    animation: fadeIn 0.3s forwards;
  }

  .evolve-flash {
    position: absolute; inset: 0;
    background: radial-gradient(circle, rgba(255,255,255,0.9) 0%, rgba(56,189,248,0) 70%);
    animation: flashAnim 1.5s infinite alternate;
  }

  .evolve-exclamation {
    font-size: 3rem; font-weight: 900; color: #fbbf24;
    text-shadow: 0 0 20px #f59e0b, 0 0 40px #fbbf24;
    z-index: 21;
    animation: popAnim 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) infinite alternate;
  }

  .evolve-banner {
    margin-top: 10px;
    background: #0284c7; color: #fff; font-weight: bold;
    padding: 6px 16px; border-radius: 20px; font-size: 0.85rem;
    z-index: 21; border: 2px solid #38bdf8;
    box-shadow: 0 0 15px rgba(56,189,248,0.5);
  }

  @keyframes flashAnim {
    0% { opacity: 0.2; transform: scale(0.8); }
    100% { opacity: 0.8; transform: scale(1.2); }
  }

  @keyframes popAnim {
    0% { transform: scale(0.9); }
    100% { transform: scale(1.3); }
  }

  .stats-panel {
    background: #132247;
    border-radius: 12px;
    padding: 10px;
    border: 1px solid #1f3768;
    display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px;
  }

  .stat-item { display: flex; flex-direction: column; gap: 3px; }
  .stat-label { font-size: 0.7rem; color: #94a3b8; display: flex; justify-content: space-between; }
  .clean-stat { grid-column: 2 / 3; }
  .toilet-status { display: flex; align-items: center; gap: 5px; min-height: 12px; color: #a3ad69; font-size: 0.68rem; }
  .toilet-status.dirty { color: #e0d99a; }
  .toilet-dot { display: inline-block; width: 7px; height: 7px; flex: 0 0 7px; border-radius: 50%; background: #a3ad69; }
  .toilet-status.dirty .toilet-dot { background: #d7d68a; box-shadow: 0 0 5px rgba(215, 214, 138, 0.5); }
  .bar-bg { height: 6px; background: #0f172a; border-radius: 3px; overflow: hidden; }
  .bar-fill { height: 100%; transition: width 0.3s; }
  .bar-fill.mood { background: #f43f5e; }
  .bar-fill.satiety { background: #fbbf24; }
  .bar-fill.clean { background: #38bdf8; }
  .bar-fill.toilet { background: #a3ad69; }

  .action-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 6px; }
  .btn-action {
    background: #1e293b; border: 1px solid #1f3768; color: #fff;
    padding: 8px 2px; border-radius: 10px; cursor: pointer;
    display: flex; flex-direction: column; align-items: center; gap: 3px; font-size: 0.7rem;
  }
  .btn-action:hover { background: #334155; }

  .toy-shelf {
    background: #132247; border-radius: 12px; padding: 10px; border: 1px solid #1f3768;
    display: flex; flex-direction: column; gap: 6px;
  }
  .shelf-title { font-size: 0.75rem; color: #94a3b8; }
  .toy-buttons { display: flex; gap: 6px; flex-wrap: wrap; }
  .toy-btn {
    background: #1e293b; border: 1px solid #334155; color: #fff;
    padding: 5px 10px; border-radius: 8px; font-size: 0.75rem; cursor: pointer;
  }
  .toy-btn.active { border-color: #38bdf8; background: #0284c7; }
  .btn-minigame {
    margin-left: auto; background: #059669; border: none; color: #fff;
    padding: 5px 10px; border-radius: 8px; font-size: 0.75rem; cursor: pointer;
  }

  .modal {
    touch-action: manipulation;
    position: fixed; inset: 0; background: rgba(0, 0, 0, 0.8);
    display: flex; align-items: center; justify-content: center; z-index: 100;
  }
  .modal-content {
    background: #132247; border: 2px solid #1f3768; border-radius: 16px;
    width: 90%; max-width: 320px; padding: 16px; display: flex; flex-direction: column; gap: 10px; text-align: center;
  }
  .modal-title { margin: 0; color: #38bdf8; font-size: 1rem; }
  .game-desc { font-size: 0.75rem; color: #94a3b8; line-height: 1.4; margin: 0; }
  .minigame-canvas-wrap { aspect-ratio: 1; background: #000; border-radius: 8px; overflow: hidden; touch-action: none; user-select: none; -webkit-user-select: none; -webkit-tap-highlight-color: transparent; }
  .minigame-canvas-wrap canvas { display: block; width: 100%; height: 100%; touch-action: none; image-rendering: auto; }
  .btn-start { background: #0284c7; border: none; color: #fff; padding: 10px; border-radius: 8px; font-weight: bold; cursor: pointer; }
  .touch-controls { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
  .btn-move { background: #1e293b; border: 1px solid #38bdf8; color: #38bdf8; padding: 10px; border-radius: 8px; font-weight: bold; cursor: pointer; }
  .modal-close { background: #334155; border: none; color: #fff; padding: 6px; border-radius: 8px; cursor: pointer; font-size: 0.8rem; }

  .store-coins { font-size: 0.85rem; color: #fbbf24; font-weight: bold; }
  .store-list { display: flex; flex-direction: column; gap: 8px; }
  .store-item { display: flex; justify-content: space-between; align-items: center; background: #1e293b; padding: 8px 12px; border-radius: 8px; font-size: 0.8rem; }
  .btn-buy { background: #d97706; border: none; color: #fff; padding: 4px 8px; border-radius: 6px; cursor: pointer; font-size: 0.75rem; }
  .btn-bought { background: #475569; border: none; color: #94a3b8; padding: 4px 8px; border-radius: 6px; font-size: 0.75rem; }

  .evolution-panel { background: #132247; border: 1px solid #1f3768; border-radius: 12px; padding: 12px; color: #e2e8f0; display: flex; flex-direction: column; gap: 8px; }
  .evolution-heading { color: #7dd3fc; font-weight: bold; font-size: 0.9rem; }
  .evolution-panel p { margin: 0; color: #94a3b8; font-size: 0.75rem; line-height: 1.5; }
  .evolution-actions { display: flex; flex-wrap: wrap; gap: 8px; }
  .evolution-button { flex: 1; min-width: 120px; background: #1e293b; border: 1px solid #38bdf8; color: #e0f2fe; border-radius: 8px; padding: 8px; cursor: pointer; font-size: 0.75rem; }
  .egg-button { background: #075985; border-color: #0ea5e9; }
  .generation-confirm { display: flex; flex-direction: column; gap: 8px; padding-top: 8px; border-top: 1px solid #334155; }
  .dex-list { display: flex; flex-direction: column; gap: 6px; }
  .dex-entry { display: grid; grid-template-columns: 18px 1fr auto; align-items: center; gap: 8px; background: #0f1b35; padding: 8px; border-radius: 6px; font-size: 0.75rem; }
  .dex-entry small { color: #7dd3fc; font-size: 0.65rem; }
  .dex-entry.undiscovered { color: #64748b; }
  .dex-entry.undiscovered small { color: #64748b; }


/* ==========================================
   画面全体を水槽にして、操作パネルを重ねるレイアウト
   ゲーム処理・ドット絵データ・操作イベントは変更しない
   ========================================== */
:global(html) {
  min-height: 100%;
  background: #061126;
}

:global(body) {
  box-sizing: border-box;
  display: block;
  min-height: 100vh;
  min-height: 100dvh;
  margin: 0;
  padding: 0;
  background: #061126;
  overflow-x: hidden;
  overflow-y: auto;
  -webkit-text-size-adjust: 100%;
}

.app-container {
  box-sizing: border-box;
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 520px;
  min-height: 100vh;
  min-height: 100dvh;
  margin: 0 auto;
  padding: max(10px, env(safe-area-inset-top)) 10px max(150px, env(safe-area-inset-bottom));
  gap: 9px;
}

/* 水槽の背景は画面いっぱいに広げる */
.aquarium-card {
  position: fixed;
  inset: 0;
  z-index: 0;
  box-sizing: border-box;
  padding: 0;
  border: 0;
  border-radius: 0;
  background: linear-gradient(180deg, #0c2a4a 0%, #051329 100%);
  pointer-events: none;
}

/* 正方形の描画領域を維持し、ドット絵が縦長・横長につぶれないようにする */
.canvas-wrapper {
  position: fixed;
  z-index: 0;
  top: 50%;
  left: 50%;
  width: min(100vw, 100dvh);
  height: min(100vw, 100dvh);
  aspect-ratio: 1 / 1;
  transform: translate(-50%, -50%);
  border: 0;
  border-radius: 0;
  background: transparent;
  overflow: hidden;
  cursor: pointer;
  pointer-events: auto;
}

/* 水槽上の文字・操作パネルを読みやすくする */
header,
.stats-panel,
.toy-shelf,
.evolution-panel {
  position: relative;
  z-index: 2;
  background: rgba(19, 34, 71, 0.88);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  box-shadow: 0 3px 14px rgba(0, 0, 0, 0.16);
}

header {
  flex: 0 0 auto;
}

.stats-panel {
  margin-top: 4px;
}

.action-grid {
  position: relative;
  z-index: 3;
  flex: 0 0 auto;
}

.btn-action,
.toy-btn,
.icon-btn,
.evolution-button {
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
}

.toy-shelf {
  margin-bottom: 4px;
}

.toast-alert {
  position: fixed;
  top: max(58px, calc(env(safe-area-inset-top) + 48px));
  left: 50%;
  z-index: 60;
  width: max-content;
  max-width: calc(100vw - 32px);
  box-sizing: border-box;
  text-align: center;
}

/* モーダルは水槽や操作パネルより手前に表示 */
.modal {
  z-index: 100;
  padding: max(12px, env(safe-area-inset-top)) 0 max(12px, env(safe-area-inset-bottom));
  box-sizing: border-box;
  overflow-y: auto;
}

.modal-content {
  max-height: calc(100dvh - 48px);
  overflow-y: auto;
  box-sizing: border-box;
}

@media (min-width: 700px) {
  .app-container {
    max-width: 560px;
    padding-top: 16px;
  }

  .canvas-wrapper {
    width: min(100vw, 100dvh);
    height: min(100vw, 100dvh);
  }
}


/* ==========================================
   操作ボタンを画面の上下端へまとめ、中央のキャラクターを見やすくする
   ========================================== */
.app-container {
  width: 100%;
  max-width: 560px;
  min-height: 100vh;
  min-height: 100dvh;
  margin: 0 auto;
  padding: 0 10px calc(150px + env(safe-area-inset-bottom));
  gap: 0;
  pointer-events: none;
}

/* 上端：タイトル・コイン・昼夜・リセット */
.app-container > header {
  position: fixed;
  top: max(8px, env(safe-area-inset-top));
  left: 50%;
  transform: translateX(-50%);
  width: calc(100% - 20px);
  max-width: 540px;
  box-sizing: border-box;
  z-index: 10;
  pointer-events: auto;
}

/* ステータスは上側に細く並べる */
.stats-panel {
  position: fixed;
  top: calc(max(8px, env(safe-area-inset-top)) + 52px);
  left: 50%;
  transform: translateX(-50%);
  width: calc(100% - 24px);
  max-width: 520px;
  box-sizing: border-box;
  padding: 7px 9px;
  gap: 7px;
  z-index: 8;
  pointer-events: none;
}

.stat-label { font-size: 0.65rem; }
.toilet-status { font-size: 0.6rem; }

/* 下端：ごはん・なでる・ストア・ゲーム */
.action-grid {
  position: fixed;
  left: 50%;
  bottom: max(8px, env(safe-area-inset-bottom));
  transform: translateX(-50%);
  width: calc(100% - 20px);
  max-width: 540px;
  box-sizing: border-box;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 7px;
  z-index: 12;
  pointer-events: auto;
}

.btn-action {
  min-height: 48px;
  padding: 5px 2px;
  background: rgba(19, 34, 71, 0.94);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.24);
  font-size: 0.7rem;
}

.btn-action .icon { font-size: 1.05rem; }

/* おもちゃは操作ボタンのすぐ上。横スクロールで中央をふさがない */
.toy-shelf {
  position: fixed;
  left: 50%;
  bottom: calc(max(8px, env(safe-area-inset-bottom)) + 57px);
  transform: translateX(-50%);
  width: calc(100% - 20px);
  max-width: 540px;
  box-sizing: border-box;
  padding: 6px 8px;
  gap: 4px;
  z-index: 11;
  pointer-events: auto;
}

.shelf-title { font-size: 0.65rem; }
.toy-buttons {
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  overflow-y: hidden;
  gap: 6px;
  padding-bottom: 2px;
  scrollbar-width: thin;
  -webkit-overflow-scrolling: touch;
}
.toy-btn { flex: 0 0 auto; white-space: nowrap; font-size: 0.68rem; padding: 5px 8px; }

/* キャラクターは中央に残し、上の情報と下の操作を避ける */
.aquarium-card { pointer-events: none; }
.canvas-wrapper {
  top: 50%;
  width: min(100vw, 100dvh, 520px);
  height: min(100vw, 100dvh, 520px);
  pointer-events: auto;
}
.canvas-wrapper canvas { pointer-events: none; }

/* 進化・図鑑パネルや各種モーダルは通常どおり操作できる */
.modal, .modal-content { pointer-events: auto; }
.evolution-panel {
  position: relative;
  z-index: 15;
  pointer-events: auto;
  margin-top: 100dvh;
}
.dex-panel { margin-top: 8px; }

.toast-alert { pointer-events: none; }

/* 世代ボタンは図鑑ボタンの右横に並べる */
.generation-open-button {
  position: relative;
  top: auto;
  left: auto;
  right: auto;
  z-index: 1;
  border: 1px solid #7dd3fc;
  border-radius: 999px;
  padding: 7px 11px;
  color: #e0f2fe;
  background: rgba(7, 89, 133, 0.96);
  box-shadow: 0 3px 12px rgba(0, 0, 0, 0.3);
  font-size: 0.75rem;
  font-weight: bold;
  cursor: pointer;
  pointer-events: auto;
  touch-action: manipulation;
}
.generation-modal-backdrop {
  position: fixed;
  inset: 0;
  z-index: 90;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  box-sizing: border-box;
  background: rgba(1, 8, 22, 0.72);
  backdrop-filter: blur(3px);
  -webkit-backdrop-filter: blur(3px);
  pointer-events: auto;
}
.evolution-panel.generation-popup {
  position: relative;
  z-index: 91;
  width: min(100%, 340px);
  max-height: calc(100dvh - 40px);
  overflow-y: auto;
  box-sizing: border-box;
  margin: 0;
  padding: 20px 14px 14px;
  gap: 12px;
  box-shadow: 0 12px 36px rgba(0, 0, 0, 0.42);
  pointer-events: auto;
}
.generation-popup-close {
  align-self: flex-end;
  width: 30px;
  height: 30px;
  margin: -12px -6px -4px 0;
  border: 1px solid #475569;
  border-radius: 50%;
  color: #e2e8f0;
  background: #1e293b;
  font-size: 1.25rem;
  line-height: 1;
  cursor: pointer;
  pointer-events: auto;
}

@media (min-width: 700px) {
  .app-container { max-width: 560px; }
  .app-container > header { max-width: 540px; }
  .stats-panel { max-width: 520px; }
  .action-grid, .toy-shelf { max-width: 540px; }
  .canvas-wrapper {
    width: min(100vw, 100dvh, 560px);
    height: min(100vw, 100dvh, 560px);
  }
}

@media (max-height: 620px) {
  .stats-panel { top: calc(max(6px, env(safe-area-inset-top)) + 48px); padding: 5px 7px; }
  .stat-label { font-size: 0.58rem; }
  .toy-shelf { bottom: calc(max(6px, env(safe-area-inset-bottom)) + 52px); }
  .btn-action { min-height: 42px; }
}



/* 図鑑ボタンを上部メニューバーの直下へ移動 */
.dex-panel {
  position: fixed;
  top: calc(max(8px, env(safe-area-inset-top)) + 56px);
  left: max(10px, calc((100vw - 540px) / 2));
  z-index: 14;
  width: max-content;
  max-width: calc(100vw - 20px);
  margin: 0;
  padding: 5px 7px;
  box-sizing: border-box;
  pointer-events: auto;
}
.dex-panel .evolution-actions {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: flex-start;
  gap: 6px;
}
.dex-panel .evolution-actions > button {
  flex: 0 0 auto;
  min-width: 0;
}
.dex-panel .evolution-button {
  padding: 6px 10px;
  font-size: 0.75rem;
  white-space: nowrap;
}
.dex-panel .dex-list {
  max-height: min(35dvh, 220px);
  overflow-y: auto;
}

/* 図鑑ボタンの下にステータスを置き、重なりを防ぐ */
.stats-panel {
  top: calc(max(8px, env(safe-area-inset-top)) + 108px);
}

@media (max-height: 620px) {
  .dex-panel { top: calc(max(6px, env(safe-area-inset-top)) + 52px); }
  .stats-panel { top: calc(max(6px, env(safe-area-inset-top)) + 100px); }
}



/* ==========================================
   Minamo メイン画面の仕上げ
   ・水中背景を画面全体で自然につなげる
   ・おもちゃを上部メニューへまとめる
   ・上下の固定メニューと水槽の境界を目立たせない
   ========================================== */
:global(html),
:global(body) {
  background: #071a33;
}

:global(body) {
  padding: 0;
  min-height: 100dvh;
  overflow-x: hidden;
  background:
    radial-gradient(ellipse at 50% 42%, rgba(15, 77, 115, 0.24) 0%, rgba(7, 26, 51, 0) 58%),
    linear-gradient(180deg, #0b2948 0%, #08213d 48%, #06162d 100%);
}

.app-container {
  max-width: 560px;
  min-height: 100dvh;
  padding: 0 10px calc(72px + env(safe-area-inset-bottom));
  gap: 0;
}

.aquarium-card {
  background: transparent;
  border: 0;
  box-shadow: none;
}

.canvas-wrapper {
  background: transparent;
  border: 0;
  box-shadow: none;
}

/* 上部のタイトル帯は枠線をなくし、水中背景となじませる */
.app-container > header {
  background: linear-gradient(180deg, rgba(8, 31, 57, 0.78), rgba(8, 31, 57, 0.34));
  border: 0;
  border-radius: 0 0 14px 14px;
  box-shadow: 0 8px 22px rgba(0, 8, 24, 0.08);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
}

/* 図鑑・世代を上段に */
.dex-panel {
  top: calc(max(8px, env(safe-area-inset-top)) + 52px);
  left: 10px;
  width: max-content;
  max-width: calc(100vw - 20px);
  padding: 5px 0;
  background: transparent;
  border: 0;
  box-shadow: none;
  backdrop-filter: none;
  -webkit-backdrop-filter: none;
}

/* 所持おもちゃも上部にまとめる */
.toy-shelf {
  top: calc(max(8px, env(safe-area-inset-top)) + 96px);
  bottom: auto;
  left: 10px;
  width: calc(100% - 20px);
  max-width: 540px;
  transform: none;
  margin: 0;
  padding: 5px 8px 6px;
  gap: 4px;
  background: linear-gradient(90deg, rgba(8, 31, 57, 0.62), rgba(8, 31, 57, 0.28));
  border: 0;
  border-radius: 10px;
  box-shadow: none;
  backdrop-filter: blur(3px);
  -webkit-backdrop-filter: blur(3px);
  z-index: 9;
}

.shelf-title {
  color: #b7d3e8;
}

.toy-buttons {
  scrollbar-width: none;
}
.toy-buttons::-webkit-scrollbar {
  display: none;
}

/* ステータスはおもちゃの下に。水槽との境界線やカード感をなくす */
.stats-panel {
  top: calc(max(8px, env(safe-area-inset-top)) + 151px);
  width: calc(100% - 24px);
  padding: 7px 9px;
  background: linear-gradient(90deg, rgba(8, 31, 57, 0.62), rgba(8, 31, 57, 0.28));
  border: 0;
  border-radius: 10px;
  box-shadow: none;
  backdrop-filter: blur(3px);
  -webkit-backdrop-filter: blur(3px);
  z-index: 8;
}

.action-grid {
  background: linear-gradient(0deg, rgba(5, 20, 40, 0.82), rgba(5, 20, 40, 0.28));
  padding-top: 7px;
  padding-bottom: 2px;
}

.btn-action {
  border-color: rgba(125, 211, 252, 0.16);
  background: rgba(19, 42, 72, 0.72);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.16);
}

@media (max-height: 700px) {
  .toy-shelf {
    top: calc(max(6px, env(safe-area-inset-top)) + 88px);
  }
  .stats-panel {
    top: calc(max(6px, env(safe-area-inset-top)) + 140px);
  }
}

@media (min-width: 700px) {
  .toy-shelf {
    left: 50%;
    transform: translateX(-50%);
    top: calc(max(8px, env(safe-area-inset-top)) + 96px);
  }
}


/* ==========================================
   メイン画面レイアウトの最終調整
   上：図鑑・世代・所持おもちゃ
   中：水槽
   下：ステータス・操作ボタン
   ========================================== */
.app-container {
  position: relative;
  width: 100%;
  max-width: 560px;
  min-height: 100dvh;
  margin: 0 auto;
  padding: 0 10px calc(66px + env(safe-area-inset-bottom));
  box-sizing: border-box;
  gap: 0;
  pointer-events: none;
}

.app-container > header {
  position: fixed;
  top: max(5px, env(safe-area-inset-top));
  left: 50%;
  transform: translateX(-50%);
  width: calc(100% - 20px);
  max-width: 540px;
  min-height: 38px;
  padding: 5px 9px;
  box-sizing: border-box;
  z-index: 20;
  pointer-events: auto;
  background: linear-gradient(180deg, rgba(8, 31, 57, 0.64), rgba(8, 31, 57, 0.18));
  border: 0;
  border-radius: 0 0 12px 12px;
  box-shadow: none;
}

/* 図鑑と世代は上部で横並び */
.dex-panel {
  position: fixed;
  top: calc(max(5px, env(safe-area-inset-top)) + 43px);
  left: 10px;
  width: max-content;
  max-width: calc(100vw - 20px);
  margin: 0;
  padding: 3px 0;
  z-index: 19;
  background: transparent;
  border: 0;
  box-shadow: none;
  pointer-events: auto;
}

.dex-panel .evolution-actions {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  gap: 6px;
}

.dex-panel .evolution-button,
.dex-panel .generation-open-button {
  min-height: 30px;
  padding: 5px 9px;
  font-size: 0.72rem;
  white-space: nowrap;
}

/* 所持おもちゃは上部メニューの次の段 */
.toy-shelf {
  position: fixed;
  top: calc(max(5px, env(safe-area-inset-top)) + 79px);
  bottom: auto;
  left: 10px;
  transform: none;
  width: calc(100% - 20px);
  max-width: 540px;
  margin: 0;
  padding: 4px 7px 5px;
  box-sizing: border-box;
  gap: 3px;
  z-index: 18;
  background: linear-gradient(90deg, rgba(8, 31, 57, 0.44), rgba(8, 31, 57, 0.12));
  border: 0;
  border-radius: 8px;
  box-shadow: none;
  backdrop-filter: blur(2px);
  -webkit-backdrop-filter: blur(2px);
  pointer-events: auto;
}

.shelf-title {
  margin: 0;
  color: #b7d3e8;
  font-size: 0.65rem;
}

.toy-buttons {
  display: flex;
  flex-wrap: nowrap;
  gap: 6px;
  overflow-x: auto;
  overflow-y: hidden;
  scrollbar-width: none;
  -webkit-overflow-scrolling: touch;
}
.toy-buttons::-webkit-scrollbar { display: none; }
.toy-btn {
  flex: 0 0 auto;
  white-space: nowrap;
  padding: 4px 7px;
  font-size: 0.68rem;
}

/* ステータスは下メニューバーの上段 */
.stats-panel {
  position: fixed;
  top: auto;
  bottom: calc(max(8px, env(safe-area-inset-bottom)) + 58px);
  left: 50%;
  transform: translateX(-50%);
  width: calc(100% - 20px);
  max-width: 540px;
  padding: 5px 8px 4px;
  box-sizing: border-box;
  gap: 7px;
  z-index: 17;
  background: linear-gradient(0deg, rgba(5, 25, 47, 0.48), rgba(5, 25, 47, 0.16));
  border: 0;
  border-radius: 9px;
  box-shadow: none;
  backdrop-filter: blur(2px);
  -webkit-backdrop-filter: blur(2px);
  pointer-events: none;
}

.stat-label { font-size: 0.65rem; }
.toilet-status { font-size: 0.58rem; }

/* 操作ボタンは画面下端に4つ並べる */
.action-grid {
  position: fixed;
  left: 50%;
  bottom: max(5px, env(safe-area-inset-bottom));
  transform: translateX(-50%);
  width: calc(100% - 20px);
  max-width: 540px;
  box-sizing: border-box;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 6px;
  padding: 5px 0 0;
  z-index: 21;
  background: linear-gradient(0deg, rgba(5, 20, 40, 0.54), rgba(5, 20, 40, 0));
  pointer-events: auto;
}

.btn-action {
  min-width: 0;
  min-height: 46px;
  padding: 4px 2px;
  font-size: 0.7rem;
  border-color: rgba(125, 211, 252, 0.16);
  background: rgba(19, 42, 72, 0.78);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
  touch-action: manipulation;
}
.btn-action .icon { font-size: 1.05rem; }

/* 水槽は上下のメニューの間に固定し、境界線をなくす */
.aquarium-card {
  position: static;
  background: transparent;
  border: 0;
  box-shadow: none;
  padding: 0;
  pointer-events: none;
}
.canvas-wrapper {
  position: fixed;
  left: 50%;
  top: calc(50% + 38px);
  transform: translate(-50%, -50%);
  width: min(calc(100vw - 20px), calc(100dvh - 300px), 520px);
  height: min(calc(100vw - 20px), calc(100dvh - 300px), 520px);
  min-width: 0;
  min-height: 0;
  aspect-ratio: 1;
  padding: 0;
  overflow: hidden;
  background: transparent;
  border: 0;
  border-radius: 12px;
  box-shadow: none;
  z-index: 1;
  pointer-events: auto;
}
.canvas-wrapper canvas {
  display: block;
  width: 100%;
  height: 100%;
  pointer-events: none;
}
.status-overlay { pointer-events: none; }

/* 図鑑などのパネルは通常どおり最前面で操作できる */
.evolution-panel.dex-panel { pointer-events: auto; }
.modal, .modal-content, .generation-modal-backdrop { pointer-events: auto; }
.toast-alert { pointer-events: none; }

@media (max-height: 700px) {
  .app-container > header { min-height: 34px; padding: 4px 8px; }
  .dex-panel { top: calc(max(4px, env(safe-area-inset-top)) + 37px); }
  .toy-shelf { top: calc(max(4px, env(safe-area-inset-top)) + 71px); padding-top: 3px; padding-bottom: 3px; }
  .shelf-title { font-size: 0.6rem; }
  .toy-btn { padding: 3px 6px; font-size: 0.63rem; }
  .stats-panel { bottom: calc(max(5px, env(safe-area-inset-bottom)) + 53px); padding: 4px 7px 3px; }
  .stat-label { font-size: 0.6rem; }
  .btn-action { min-height: 42px; }
  .canvas-wrapper { top: calc(50% + 28px); width: min(calc(100vw - 20px), calc(100dvh - 260px), 520px); height: min(calc(100vw - 20px), calc(100dvh - 260px), 520px); }
}

@media (min-width: 700px) {
  .app-container > header { max-width: 540px; }
  .dex-panel { left: max(10px, calc((100vw - 540px) / 2)); }
  .toy-shelf { left: 50%; transform: translateX(-50%); }
  .stats-panel, .action-grid { max-width: 540px; }
  .canvas-wrapper { width: min(calc(100vw - 40px), calc(100dvh - 300px), 560px); height: min(calc(100vw - 40px), calc(100dvh - 300px), 560px); }
}


/* ==========================================
   iPhone 14向けの安全な微調整
   既存レイアウト・操作・ドット絵は変更しない
   ========================================== */
@supports (height: 100dvh) {
  :global(body) {
    min-height: 100dvh;
  }
}

/* iPhoneの縦画面：下の操作ボタンとステータスの重なりを防ぐ */
@media (max-width: 699px) and (min-height: 701px) {
  .stats-panel {
    bottom: calc(max(8px, env(safe-area-inset-bottom)) + 66px);
  }

  .action-grid {
    bottom: max(5px, env(safe-area-inset-bottom));
    padding-bottom: max(3px, env(safe-area-inset-bottom));
  }

  .btn-action {
    min-height: 46px;
    touch-action: manipulation;
    -webkit-tap-highlight-color: transparent;
  }

  .toy-btn,
  .icon-btn,
  .evolution-button,
  .generation-open-button {
    touch-action: manipulation;
    -webkit-tap-highlight-color: transparent;
  }
}

</style>