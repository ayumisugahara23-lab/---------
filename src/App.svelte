<script>
  // =========================
  // キャラクターの状態
  // =========================

  let fullness = 50
  let affection = 50
  let playfulness = 0

  let message = 'キャラクターに触れてみよう！'


  // =========================
  // なでなで
  // =========================

  let isPetting = false
  let isMoving = false

  let lastX = 0
  let lastY = 0

  let petTimer = null


  // =========================
  // ごはん
  // =========================

  const foods = [
    {
      name: '木の実',
      emoji: '🌰',
      amount: 10
    },
    {
      name: 'きのこ',
      emoji: '🍄',
      amount: 15
    },
    {
      name: 'おやつ',
      emoji: '🍰',
      amount: 20
    }
  ]

  let selectedFood = null

  let isDraggingFood = false
  let isEating = false

  let foodX = 0
  let foodY = 0

  let foodStartX = 0
  let foodStartY = 0

  let foodWasMoved = false

  let autoEatTimer = null

  let autoFoodVisible = false

  let mouthElement


  // =========================
  // 遊び
  // =========================

  const toys = [
    {
      name: 'ボール',
      emoji: '⚽'
    }
  ]

  let selectedToy = null

  let isDraggingToy = false

  let toyX = 0
  let toyY = 0

  let toyStartX = 0
  let toyStartY = 0

  let toyWasMoved = false

  let isPlaying = false

  let playTimer = null


  // =========================
  // なで始める
  // =========================

  function startPetting(event) {
    if (isEating || isPlaying) {
      return
    }

    isPetting = true
    isMoving = false

    lastX = event.clientX
    lastY = event.clientY

    message = 'なでてみて……'

    affection = Math.min(
      affection + 1,
      100
    )

    petTimer = setInterval(() => {
      if (isMoving) {
        affection = Math.min(
          affection + 1,
          100
        )

        message = 'なでなで……'
      }
    }, 300)

    if (event.currentTarget.setPointerCapture) {
      event.currentTarget.setPointerCapture(
        event.pointerId
      )
    }
  }


  // =========================
  // なでながら動かす
  // =========================

  function movePetting(event) {
    if (!isPetting) {
      return
    }

    const distanceX =
      Math.abs(event.clientX - lastX)

    const distanceY =
      Math.abs(event.clientY - lastY)

    if (
      distanceX > 3 ||
      distanceY > 3
    ) {
      isMoving = true

      message = 'なでなで……'

      lastX = event.clientX
      lastY = event.clientY
    }
  }


  // =========================
  // なで終わる
  // =========================

  function stopPetting() {
    if (!isPetting) {
      return
    }

    isPetting = false
    isMoving = false

    clearInterval(petTimer)
    petTimer = null

    message = 'うれしい！'
  }


  // =========================
  // ごはんを押した瞬間
  // =========================

  function startFoodDrag(event, food) {
    if (isEating || isPlaying) {
      return
    }

    event.preventDefault()

    clearTimeout(autoEatTimer)

    selectedFood = food

    isDraggingFood = true

    foodWasMoved = false

    autoFoodVisible = false

    foodStartX = event.clientX
    foodStartY = event.clientY

    foodX = event.clientX
    foodY = event.clientY

    message =
      `${food.name}を口まで運んでね！`

    if (event.currentTarget.setPointerCapture) {
      event.currentTarget.setPointerCapture(
        event.pointerId
      )
    }
  }


  // =========================
  // ごはんを動かす
  // =========================

  function moveFood(event) {
    if (
      !isDraggingFood ||
      !selectedFood
    ) {
      return
    }

    const distanceX =
      Math.abs(event.clientX - foodStartX)

    const distanceY =
      Math.abs(event.clientY - foodStartY)

    if (
      distanceX > 5 ||
      distanceY > 5
    ) {
      foodWasMoved = true
    }

    foodX = event.clientX
    foodY = event.clientY

    checkFoodNearMouth()
  }


  // =========================
  // ごはんを離す
  // =========================

  function stopFoodDrag() {
    if (!isDraggingFood) {
      return
    }

    isDraggingFood = false

    if (!isEating) {
      message = '口まで運んであげてね！'
    }
  }


  // =========================
  // 口に近いか確認
  // =========================

  function checkFoodNearMouth() {
    if (
      !mouthElement ||
      !selectedFood
    ) {
      return
    }

    const rect =
      mouthElement.getBoundingClientRect()

    const mouthX =
      rect.left + rect.width / 2

    const mouthY =
      rect.top + rect.height / 2

    const distance =
      Math.sqrt(
        (foodX - mouthX) ** 2 +
        (foodY - mouthY) ** 2
      )

    if (distance < 65) {
      eatFood()
    }
  }


  // =========================
  // ごはんをクリック
  // =========================

  function clickFood(food) {
    if (isEating || isPlaying) {
      return
    }

    selectedFood = food

    foodWasMoved = false

    message = `${food.name}をあげるよ！`

    clearTimeout(autoEatTimer)

    autoEatTimer = setTimeout(() => {
      if (
        selectedFood === food &&
        !foodWasMoved &&
        !isDraggingFood
      ) {
        autoMoveFoodToMouth()
      }
    }, 150)
  }


  // =========================
  // 自動で口へ
  // =========================

  function autoMoveFoodToMouth() {
    if (
      !selectedFood ||
      isEating ||
      !mouthElement
    ) {
      return
    }

    const rect =
      mouthElement.getBoundingClientRect()

    const mouthX =
      rect.left + rect.width / 2

    const mouthY =
      rect.top + rect.height / 2

    foodX = mouthX
    foodY = mouthY

    autoFoodVisible = true

    message = 'どうぞ……'

    setTimeout(() => {
      if (
        selectedFood &&
        !isEating
      ) {
        eatFood()
      }
    }, 400)
  }


  // =========================
  // 食べる
  // =========================

  function eatFood() {
    if (
      !selectedFood ||
      isEating
    ) {
      return
    }

    clearTimeout(autoEatTimer)

    autoEatTimer = null

    isDraggingFood = false
    autoFoodVisible = false

    isEating = true

    message = 'ぱくっ！'

    fullness = Math.min(
      fullness + selectedFood.amount,
      100
    )

    setTimeout(() => {
      isEating = false

      message = 'おいしかった！'

      selectedFood = null
    }, 850)
  }


  // ==================================================
  // ここから「遊び」
  // ==================================================


  // =========================
  // ボールを押す
  // =========================

  function startToyDrag(event, toy) {
    if (
      isEating ||
      isPlaying
    ) {
      return
    }

    event.preventDefault()

    selectedToy = toy

    isDraggingToy = true

    toyWasMoved = false

    toyStartX = event.clientX
    toyStartY = event.clientY

    toyX = event.clientX
    toyY = event.clientY

    message =
      'ボールを動かしてみよう！'

    if (event.currentTarget.setPointerCapture) {
      event.currentTarget.setPointerCapture(
        event.pointerId
      )
    }
  }


  // =========================
  // ボールを動かす
  // =========================

  function moveToy(event) {
    if (
      !isDraggingToy ||
      !selectedToy
    ) {
      return
    }

    const distanceX =
      Math.abs(event.clientX - toyStartX)

    const distanceY =
      Math.abs(event.clientY - toyStartY)

    if (
      distanceX > 5 ||
      distanceY > 5
    ) {
      toyWasMoved = true
    }

    toyX = event.clientX
    toyY = event.clientY

    checkToyNearCreature()
  }


  // =========================
  // ボールを離す
  // =========================

  function stopToyDrag() {
    if (!isDraggingToy) {
      return
    }

    isDraggingToy = false

    if (!isPlaying) {
      message = 'またボールで遊ぼう！'
    }
  }


  // =========================
  // ボールがキャラクターに近いか
  // =========================

  function checkToyNearCreature() {

    /*
      キャラクターのだいたい中央を
      遊び判定の場所にする
    */

    const creatureX =
      window.innerWidth / 2

    /*
      キャラクターの位置は
      画面中央付近なので、
      だいたいこのあたりを判定する
    */

    const creatureY =
      window.innerHeight * 0.38

    const distance =
      Math.sqrt(
        (toyX - creatureX) ** 2 +
        (toyY - creatureY) ** 2
      )

    if (distance < 120) {
      startPlaying()
    }
  }


  // =========================
  // 遊び開始
  // =========================

  function startPlaying() {

    if (
      isPlaying ||
      !selectedToy
    ) {
      return
    }

    isPlaying = true

    isDraggingToy = false

    message = 'わーい！あそぼう！'

    /*
      遊びメーターを少しずつ増やす
    */

    playTimer = setInterval(() => {

      playfulness = Math.min(
        playfulness + 1,
        100
      )

    }, 250)


    /*
      少し遊んだら終了
    */

    setTimeout(() => {

      clearInterval(playTimer)

      playTimer = null

      isPlaying = false

      message = '楽しかった！'

      selectedToy = null

      toyX = 0
      toyY = 0

    }, 1800)
  }
</script>


<div class="game">

  <!-- =========================
       タイトル
       ========================= -->

  <h1>ふしぎな生き物</h1>


  <!-- =========================
       メッセージ
       ========================= -->

  <div class="message">
    {message}
  </div>


  <!-- =========================
       キャラクター
       ========================= -->

  <div
    class="creature-area"
    class:petting={isPetting && isMoving}
    class:eating={isEating}
    class:playing={isPlaying}
  >

    <div
      class="creature"
      onpointerdown={startPetting}
      onpointermove={movePetting}
      onpointerup={stopPetting}
      onpointercancel={stopPetting}
    >

      <div class="pixel-art">

        <!-- 耳 -->
        <div class="pixel p-ear-l1"></div>
        <div class="pixel p-ear-l2"></div>
        <div class="pixel p-ear-l3"></div>

        <div class="pixel p-ear-r1"></div>
        <div class="pixel p-ear-r2"></div>
        <div class="pixel p-ear-r3"></div>


        <!-- 頭 -->
        <div class="pixel p-head-1"></div>
        <div class="pixel p-head-2"></div>
        <div class="pixel p-head-3"></div>
        <div class="pixel p-head-4"></div>
        <div class="pixel p-head-5"></div>


        <!-- 顔 -->
        <div class="pixel p-face-1"></div>
        <div class="pixel p-face-2"></div>
        <div class="pixel p-face-3"></div>


        <!-- 目 -->
        <div class="pixel p-eye-l"></div>
        <div class="pixel p-eye-r"></div>


        <!-- ほっぺ -->
        <div class="pixel p-cheek-l"></div>
        <div class="pixel p-cheek-r"></div>


        <!-- 口 -->
        <div
          class="pixel p-mouth"
          bind:this={mouthElement}
        ></div>


        <!-- 体 -->
        <div class="pixel p-body-1"></div>
        <div class="pixel p-body-2"></div>
        <div class="pixel p-body-3"></div>


        <!-- 足 -->
        <div class="pixel p-foot-l"></div>
        <div class="pixel p-foot-r"></div>

      </div>

    </div>

  </div>


  <!-- =========================
       ステータス
       ========================= -->

  <div class="status">

    <div class="status-item">

      <div class="status-title">
        おなか
      </div>

      <div class="meter">
        <div
          class="meter-fill"
          style={`width: ${fullness}%`}
        ></div>
      </div>

      <div class="number">
        {fullness}
      </div>

    </div>


    <div class="status-item">

      <div class="status-title">
        なかよし
      </div>

      <div class="meter">
        <div
          class="meter-fill"
          style={`width: ${affection}%`}
        ></div>
      </div>

      <div class="number">
        {affection}
      </div>

    </div>


    <div class="status-item">

      <div class="status-title">
        あそび
      </div>

      <div class="meter">
        <div
          class="meter-fill"
          style={`width: ${playfulness}%`}
        ></div>
      </div>

      <div class="number">
        {playfulness}
      </div>

    </div>

  </div>


  <!-- =========================
       ごはん
       ========================= -->

  <section class="food-section">

    <h2>ごはん</h2>

    <p class="help">
      クリックで食べさせたり、
      そのまま運んだりできるよ
    </p>


    <div class="food-list">

      {#each foods as food}

        <div
          class="food-item"
          class:selected={selectedFood === food}

          onclick={() => clickFood(food)}

          onpointerdown={
            (event) =>
              startFoodDrag(event, food)
          }

          onpointermove={moveFood}

          onpointerup={stopFoodDrag}

          onpointercancel={stopFoodDrag}
        >

          <div class="food-emoji">
            {food.emoji}
          </div>

          <div class="food-name">
            {food.name}
          </div>

        </div>

      {/each}

    </div>


    {#if selectedFood && !isEating}

      <div class="food-help">
        押したまま動かすと、
        自分で口まで運べるよ
      </div>

    {/if}

  </section>


  <!-- =========================
       運んでいるごはん
       ========================= -->

  {#if isDraggingFood && selectedFood}

    <div
      class="moving-food"
      style={`
        left: ${foodX}px;
        top: ${foodY}px;
      `}
    >
      {selectedFood.emoji}
    </div>

  {/if}


  <!-- =========================
       自動で口へ向かうごはん
       ========================= -->

  {#if autoFoodVisible && selectedFood}

    <div
      class="auto-food"
      style={`
        left: ${foodX}px;
        top: ${foodY}px;
      `}
    >
      {selectedFood.emoji}
    </div>

  {/if}


  <!-- ==================================================
       遊ぶ
       ================================================== -->

  <section class="toy-section">

    <h2>あそぶ</h2>

    <p class="help">
      おもちゃをキャラクターの近くまで
      持っていこう！
    </p>


    <div class="toy-list">

      {#each toys as toy}

        <div
          class="toy-item"
          class:selected={selectedToy === toy}

          onpointerdown={
            (event) =>
              startToyDrag(event, toy)
          }

          onpointermove={moveToy}

          onpointerup={stopToyDrag}

          onpointercancel={stopToyDrag}
        >

          <div class="toy-emoji">
            {toy.emoji}
          </div>

          <div class="toy-name">
            {toy.name}
          </div>

        </div>

      {/each}

    </div>


    <div class="toy-help">
      ボールを押したまま、
      キャラクターの近くまで動かしてね
    </div>

  </section>


  <!-- =========================
       動かしているボール
       ========================= -->

  {#if isDraggingToy && selectedToy}

    <div
      class="moving-toy"
      style={`
        left: ${toyX}px;
        top: ${toyY}px;
      `}
    >
      {selectedToy.emoji}
    </div>

  {/if}


  <!-- =========================
       遊んでいるボール
       ========================= -->

  {#if isPlaying && selectedToy}

    <div class="playing-toy">
      {selectedToy.emoji}
    </div>

  {/if}

</div>


<style>

  /* =========================
     ページ全体
     ========================= */

  :global(body) {
    margin: 0;

    background: #f4efe5;

    color: #4a4038;

    font-family:
      sans-serif;
  }


  .game {
    width:
      min(100%, 600px);

    min-height:
      100vh;

    margin:
      0 auto;

    padding:
      24px 16px 40px;

    box-sizing:
      border-box;

    text-align:
      center;
  }


  /* =========================
     タイトル
     ========================= */

  h1 {
    margin:
      10px 0 12px;

    font-size:
      28px;
  }


  /* =========================
     メッセージ
     ========================= */

  .message {
    min-height:
      28px;

    margin-bottom:
      8px;

    font-size:
      16px;
  }


  /* =========================
     キャラクターエリア
     ========================= */

  .creature-area {
    width:
      100%;

    height:
      300px;

    display:
      flex;

    align-items:
      center;

    justify-content:
      center;

    touch-action:
      none;

    user-select:
      none;
  }


  /* =========================
     キャラクター
     ========================= */

  .creature {
    width:
      180px;

    height:
      190px;

    cursor:
      pointer;

    touch-action:
      none;

    user-select:
      none;

    image-rendering:
      pixelated;

    animation:
      breathing
      2.4s
      steps(4, end)
      infinite;
  }


  .pixel-art {
    position:
      relative;

    width:
      160px;

    height:
      180px;

    margin:
      0 auto;

    image-rendering:
      pixelated;
  }


  .pixel {
    position:
      absolute;

    width:
      8px;

    height:
      8px;

    box-sizing:
      border-box;
  }


  /* =========================
     耳
     ========================= */

  .p-ear-l1 {
    left: 40px;
    top: 24px;
    background: #806d59;
  }

  .p-ear-l2 {
    left: 48px;
    top: 16px;
    width: 24px;
    background: #806d59;
  }

  .p-ear-l3 {
    left: 48px;
    top: 24px;
    width: 24px;
    background: #c9ad8d;
  }


  .p-ear-r1 {
    left: 104px;
    top: 16px;
    width: 24px;
    background: #806d59;
  }

  .p-ear-r2 {
    left: 112px;
    top: 24px;
    width: 24px;
    background: #806d59;
  }

  .p-ear-r3 {
    left: 112px;
    top: 24px;
    width: 16px;
    background: #c9ad8d;
  }


  /* =========================
     頭
     ========================= */

  .p-head-1 {
    left: 40px;
    top: 32px;

    width: 88px;
    height: 8px;

    background: #806d59;
  }

  .p-head-2 {
    left: 32px;
    top: 40px;

    width: 104px;
    height: 64px;

    background: #806d59;
  }

  .p-head-3 {
    left: 40px;
    top: 40px;

    width: 88px;
    height: 56px;

    background: #c9ad8d;
  }

  .p-head-4 {
    left: 48px;
    top: 96px;

    width: 72px;
    height: 16px;

    background: #c9ad8d;
  }

  .p-head-5 {
    left: 40px;
    top: 104px;

    width: 88px;
    height: 8px;

    background: #806d59;
  }


  /* =========================
     顔
     ========================= */

  .p-face-1 {
    left: 48px;
    top: 48px;

    width: 72px;
    height: 40px;

    background: #c9ad8d;
  }

  .p-face-2 {
    left: 40px;
    top: 56px;

    width: 88px;
    height: 32px;

    background: #c9ad8d;
  }

  .p-face-3 {
    left: 48px;
    top: 88px;

    width: 72px;
    height: 8px;

    background: #c9ad8d;
  }


  /* =========================
     目
     ========================= */

  .p-eye-l {
    left: 56px;
    top: 64px;

    width: 8px;
    height: 12px;

    background: #403932;
  }

  .p-eye-r {
    left: 104px;
    top: 64px;

    width: 8px;
    height: 12px;

    background: #403932;
  }


  /* =========================
     ほっぺ
     ========================= */

  .p-cheek-l {
    left: 40px;
    top: 80px;

    width: 16px;
    height: 8px;

    background: #c7897f;
  }

  .p-cheek-r {
    left: 112px;
    top: 80px;

    width: 16px;
    height: 8px;

    background: #c7897f;
  }


  /* =========================
     口
     ========================= */

  .p-mouth {
    left: 80px;
    top: 80px;

    width: 16px;
    height: 12px;

    background: #554039;
  }


  /* =========================
     体
     ========================= */

  .p-body-1 {
    left: 48px;
    top: 112px;

    width: 72px;
    height: 32px;

    background: #806d59;
  }

  .p-body-2 {
    left: 56px;
    top: 112px;

    width: 56px;
    height: 32px;

    background: #c9ad8d;
  }

  .p-body-3 {
    left: 64px;
    top: 120px;

    width: 40px;
    height: 24px;

    background: #d7bea0;
  }


  /* =========================
     足
     ========================= */

  .p-foot-l {
    left: 48px;
    top: 144px;

    width: 24px;
    height: 16px;

    background: #806d59;
  }

  .p-foot-r {
    left: 96px;
    top: 144px;

    width: 24px;
    height: 16px;

    background: #806d59;
  }


  /* =========================
     通常の呼吸
     ========================= */

  @keyframes breathing {

    0%,
    100% {
      transform:
        translateY(0);
    }

    50% {
      transform:
        translateY(-3px);
    }
  }


  /* =========================
     なでなで
     ========================= */

  .creature-area.petting
  .creature {
    animation:
      pettingMotion
      0.45s
      steps(3, end)
      infinite;
  }


  @keyframes pettingMotion {

    0% {
      transform:
        translateX(-3px);
    }

    50% {
      transform:
        translateX(3px)
        translateY(-3px);
    }

    100% {
      transform:
        translateX(-3px);
    }
  }


  /* =========================
     食べる
     ========================= */

  .creature-area.eating
  .creature {
    animation:
      eatingMotion
      0.25s
      steps(2, end)
      3;
  }


  @keyframes eatingMotion {

    0% {
      transform:
        scale(1);
    }

    50% {
      transform:
        scale(1.08);
    }

    100% {
      transform:
        scale(1);
    }
  }


  /* =========================
     遊ぶとき
     ========================= */

  .creature-area.playing
  .creature {
    animation:
      playingMotion
      0.35s
      steps(2, end)
      infinite;
  }


  @keyframes playingMotion {

    0% {
      transform:
        translateY(0);
    }

    50% {
      transform:
        translateY(-12px)
        rotate(-3deg);
    }

    100% {
      transform:
        translateY(0)
        rotate(3deg);
    }
  }


  /* =========================
     ステータス
     ========================= */

  .status {
    width:
      min(100%, 400px);

    margin:
      0 auto 28px;

    display:
      flex;

    flex-direction:
      column;

    gap:
      12px;
  }


  .status-item {
    display:
      grid;

    grid-template-columns:
      70px 1fr 40px;

    align-items:
      center;

    gap:
      8px;
  }


  .status-title {
    font-size:
      14px;

    text-align:
      left;
  }


  .meter {
    height:
      14px;

    background:
      #ddd4c7;

    border-radius:
      8px;

    overflow:
      hidden;
  }


  .meter-fill {
    height:
      100%;

    background:
      #9eb78d;

    transition:
      width 0.3s ease;
  }


  .number {
    font-size:
      13px;

    text-align:
      right;
  }


  /* =========================
     ごはん
     ========================= */

  .food-section {
    padding:
      18px;

    background:
      #fffaf2;

    border:
      2px solid #ddd0bd;

    border-radius:
      16px;
  }


  h2 {
    margin:
      0 0 4px;

    font-size:
      20px;
  }


  .help {
    margin:
      0 0 14px;

    font-size:
      13px;

    color:
      #76695e;
  }


  .food-list {
    display:
      flex;

    justify-content:
      center;

    gap:
      10px;
  }


  .food-item {
    width:
      82px;

    padding:
      10px 6px;

    background:
      #fff;

    border:
      2px solid #d7c8b4;

    border-radius:
      12px;

    cursor:
      grab;

    touch-action:
      none;

    user-select:
      none;

    box-sizing:
      border-box;
  }


  .food-item.selected {
    border:
      3px solid #806d59;

    background:
      #f4eadc;
  }


  .food-emoji {
    font-size:
      30px;
  }


  .food-name {
    margin-top:
      4px;

    font-size:
      12px;
  }


  .food-help {
    margin-top:
      14px;

    font-size:
      13px;

    line-height:
      1.6;
  }


  /* =========================
     動かしているごはん
     ========================= */

  .moving-food {
    position:
      fixed;

    z-index:
      1000;

    transform:
      translate(-50%, -50%);

    font-size:
      38px;

    pointer-events:
      none;

    user-select:
      none;
  }


  .auto-food {
    position:
      fixed;

    z-index:
      1000;

    transform:
      translate(-50%, -50%);

    font-size:
      38px;

    pointer-events:
      none;

    animation:
      autoFoodMotion
      0.4s
      ease-out;
  }


  @keyframes autoFoodMotion {

    from {
      transform:
        translate(-50%, -50%)
        scale(0.7);
    }

    to {
      transform:
        translate(-50%, -50%)
        scale(1);
    }
  }


  /* ==================================================
     遊び
     ================================================== */

  .toy-section {
    margin-top:
      20px;

    padding:
      18px;

    background:
      #f8f4ff;

    border:
      2px solid #d8cfe5;

    border-radius:
      16px;
  }


  .toy-list {
    display:
      flex;

    justify-content:
      center;

    gap:
      10px;
  }


  .toy-item {
    width:
      90px;

    padding:
      10px 6px;

    background:
      #fff;

    border:
      2px solid #cfc3df;

    border-radius:
      12px;

    cursor:
      grab;

    touch-action:
      none;

    user-select:
      none;

    box-sizing:
      border-box;
  }


  .toy-item.selected {
    border:
      3px solid #806d59;

    background:
      #eee7fa;
  }


  .toy-emoji {
    font-size:
      36px;
  }


  .toy-name {
    margin-top:
      4px;

    font-size:
      12px;
  }


  .toy-help {
    margin-top:
      14px;

    font-size:
      13px;

    line-height:
      1.6;
  }


  /* =========================
     動かしているボール
     ========================= */

  .moving-toy {
    position:
      fixed;

    z-index:
      1000;

    transform:
      translate(-50%, -50%);

    font-size:
      42px;

    pointer-events:
      none;

    user-select:
      none;
  }


  /* =========================
     遊んでいるボール
     ========================= */

  .playing-toy {
    position:
      fixed;

    left:
      50%;

    top:
      38%;

    z-index:
      900;

    font-size:
      42px;

    pointer-events:
      none;

    animation:
      ballPlayMotion
      0.45s
      steps(3, end)
      infinite;
  }


  @keyframes ballPlayMotion {

    0% {
      transform:
        translate(-80px, 20px);
    }

    50% {
      transform:
        translate(0, -40px);
    }

    100% {
      transform:
        translate(80px, 20px);
    }
  }


  /* =========================
     スマートフォン
     ========================= */

  @media (max-width: 480px) {

    .game {
      padding:
        18px
        12px
        30px;
    }

    h1 {
      font-size:
        24px;
    }

    .creature-area {
      height:
        270px;
    }

    .food-item {
      width:
        78px;
    }
  }

</style>