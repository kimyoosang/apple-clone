//전역변수 사용을 피하기 위해 함수 안에서 지역변수로 지정하여, 밖에서 지정을 하지 못하게 하기 위해 사용

(() => {

  let yOffset = 0; // window.pageYOffset 대신 쓸 변수
  let prevScrollHeight = 0; // 현재 스크롤 위치(yOffset)보다 이전에 위치한 스크롤 섹션들의 스크롤 높이의 합
  let currentScene = 0; //현재 활성화된(눈 앞에 보고있는) 씬(scroll-section)
  let enterNewscene = false; //새로운 씬이 시작된 순간 true

  const sceneInfo = [
    {
      // 0
      type: 'sticky',
      heightNum: 5, // 브라우저 높이의 5배로 scrollHeight 세팅
      scrollHeight: 0,
      objs: {
        container: document.querySelector('#scroll-section-0'),
        messageA: document.querySelector('#scroll-section-0 .main-message.a'),
        messageB: document.querySelector('#scroll-section-0 .main-message.b'),
        messageC: document.querySelector('#scroll-section-0 .main-message.c'),
        messageD: document.querySelector('#scroll-section-0 .main-message.d'),
        canvas: document.querySelector('#video-canvas-0'),
        context: document.querySelector('#video-canvas-0').getContext('2d'),
        videoImages: []

      },
      values: {
        videoImageCount: 300,
        imageSequence: [0, 299],
        canvas_opacity: [1, 0, { start: 0.9, end: 1 }], //시작을 투명 1로하여 끝에를 0으로, 거의 끝나갈대쯤 캔버스가 없어지도록 start를 0.9, end를 1
        messageA_opacity_in: [0, 1, { start: 0.1, end: 0.2 }],
        messageB_opacity_in: [0, 1, { start: 0.3, end: 0.4 }],
        messageC_opacity_in: [0, 1, { start: 0.5, end: 0.6 }],
        messageD_opacity_in: [0, 1, { start: 0.7, end: 0.8 }],
        messageA_translateY_in: [20, 0, { start: 0.1, end: 0.2 }],
        messageB_translateY_in: [20, 0, { start: 0.3, end: 0.4 }],
        messageC_translateY_in: [20, 0, { start: 0.5, end: 0.6 }],
        messageD_translateY_in: [20, 0, { start: 0.7, end: 0.8 }],
        messageA_opacity_out: [1, 0, { start: 0.25, end: 0.3 }],
        messageB_opacity_out: [1, 0, { start: 0.45, end: 0.5 }],
        messageC_opacity_out: [1, 0, { start: 0.65, end: 0.7 }],
        messageD_opacity_out: [1, 0, { start: 0.85, end: 0.9 }],
        messageA_translateY_out: [0, -20, { start: 0.25, end: 0.3 }],
        messageB_translateY_out: [0, -20, { start: 0.45, end: 0.5 }],
        messageC_translateY_out: [0, -20, { start: 0.65, end: 0.7 }],
        messageD_translateY_out: [0, -20, { start: 0.85, end: 0.9 }]
      }
    },
    {
      // 1
      type: 'normal',
      // heightNum: 5, // type normal에서는 필요 없음
      scrollHeight: 0,
      objs: {
        container: document.querySelector('#scroll-section-1'),
        content: document.querySelector('#scroll-section-1 .description')
      }
    },
    {
      // 2
      type: 'sticky',
      heightNum: 5,
      scrollHeight: 0,
      objs: {
        container: document.querySelector('#scroll-section-2'),
        messageA: document.querySelector('#scroll-section-2 .a'),
        messageB: document.querySelector('#scroll-section-2 .b'),
        messageC: document.querySelector('#scroll-section-2 .c'),
        pinB: document.querySelector('#scroll-section-2 .b .pin'),
        pinC: document.querySelector('#scroll-section-2 .c .pin'),
        canvas: document.querySelector('#video-canvas-1'),
        context: document.querySelector('#video-canvas-1').getContext('2d'),
        videoImages: []
      },
      values: {
        videoImageCount: 960,
        imageSequence: [0, 959],
        canvas_opacity_in: [0, 1, { start: 0, end: 0.1 }],
        canvas_opacity_out: [1, 0, { start: 0.95, end: 1 }],
        messageA_translateY_in: [20, 0, { start: 0.15, end: 0.2 }],
        messageB_translateY_in: [30, 0, { start: 0.6, end: 0.65 }],
        messageC_translateY_in: [30, 0, { start: 0.87, end: 0.92 }],
        messageA_opacity_in: [0, 1, { start: 0.25, end: 0.3 }],
        messageB_opacity_in: [0, 1, { start: 0.6, end: 0.65 }],
        messageC_opacity_in: [0, 1, { start: 0.87, end: 0.92 }],
        messageA_translateY_out: [0, -20, { start: 0.4, end: 0.45 }],
        messageB_translateY_out: [0, -20, { start: 0.68, end: 0.73 }],
        messageC_translateY_out: [0, -20, { start: 0.95, end: 1 }],
        messageA_opacity_out: [1, 0, { start: 0.4, end: 0.45 }],
        messageB_opacity_out: [1, 0, { start: 0.68, end: 0.73 }],
        messageC_opacity_out: [1, 0, { start: 0.95, end: 1 }],
        pinB_scaleY: [0.5, 1, { start: 0.6, end: 0.65 }],
        pinC_scaleY: [0.5, 1, { start: 0.87, end: 0.92 }]
      }
    },
    {
      // 3
      type: 'sticky',
      heightNum: 5,
      scrollHeight: 0,
      objs: {
        container: document.querySelector('#scroll-section-3'),
        canvasCaption: document.querySelector('.canvas-caption'),
        canvas: document.querySelector('.image-blend-canvas'),
        context: document.querySelector('.image-blend-canvas').getContext('2d'),
        imagesPath: [
          './images/blend-image-1.jpg',
          './images/blend-image-2.jpg'
        ],
        images: []
      },
      values: {
        rect1X: [0, 0, { start: 0, end: 0 }], //나중에 계산해서 넣으려고 공간만 만들어놓은것
        rect2X: [0, 0, { start: 0, end: 0 }], //나중에 계산해서 넣으려고 공간만 만들어놓은것
        blendHeight: [0, 0, { start: 0, end: 0 }], //0, 0 의 의미 === 시작은 0으로하고 끝은 나중에 캔버스 바다모양 사진 크기만큼으로 하면됨
        canvas_scale: [0, 0, { start: 0, end: 0 }],
        canvasCaption_opacity: [0, 1, { start: 0, end: 0 }],
        canvasCaption_translateY: [20, 0, { start: 0, end: 0 }],
        rectStartY: 0 // 캔버스가 처음 시작되는 위치를 넣기 위해서 자리만 일단 만들어놓았음, 처음 시작되는 값을 처음에 한번만 넣고 그 이후에는 그 값을 기준으로 end값을 계산할것임

      }
    }
  ];

  function setCanvasImages() {
    let imaElem;
    for (let i = 0; i < sceneInfo[0].values.videoImageCount; i++) {
      imaElem = new Image();
      imaElem.src = `./video/001/IMG_${6726 + i}.JPG`;
      sceneInfo[0].objs.videoImages.push(imaElem); //캔버스에서 드로우 이미지로 이미지를 그릴때, 이미지 엘리먼트 자체를 사용, 캔버스에서 그릴때 가져다 쓰려고 배열에 넣어놓음
    }

    let imaElem2;
    for (let i = 0; i < sceneInfo[2].values.videoImageCount; i++) {
      imaElem2 = new Image();
      imaElem2.src = `./video/002/IMG_${7027 + i}.JPG`;
      sceneInfo[2].objs.videoImages.push(imaElem2); //캔버스에서 드로우 이미지로 이미지를 그릴때, 이미지 엘리먼트 자체를 사용, 캔버스에서 그릴때 가져다 쓰려고 배열에 넣어놓음
    }

    let imaElem3;
    for (let i = 0; i < sceneInfo[3].objs.imagesPath.length; i++) {
      imaElem3 = new Image();
      imaElem3.src = sceneInfo[3].objs.imagesPath[i];
      sceneInfo[3].objs.images.push(imaElem3);
    }
    console.log(sceneInfo[3].objs.images)
  }

  function checkMenu() {
    if (yOffset > 44) {
      document.body.classList.add('local-nav-sticky');
    } else {
      document.body.classList.remove('local-nav-sticky');
    }
  }


  function setLayout() {
    //각 스크롤 섹션의 높이 세팅 (모바일이나 다른 크기의 화면에서도 스크롤 인터렉션이 정상적으로 잘 보일 수 있도록 하기위해)
    for (let i = 0; i < sceneInfo.length; i++) {
      if (sceneInfo[i].type === 'sticky') {
        sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight; //window는 생략가능, sceneInfo 배열에있는 각 씬의 scrollHeight를 잡아주고 (실제 window.innerHeight의 5배로 잡아줌)
      }
      else if (sceneInfo[i].type === 'normal') {
        sceneInfo[i].scrollHeight = sceneInfo[i].objs.container.offsetHeight; // document.querySelector('#scroll-section-i')의 크기로 설정 (아무 애니메이션이 없는 곳에는 스크롤을 늘려줄 필요가 없기 때문에 기본으로 설정)
      }
      sceneInfo[i].objs.container.style.height = `${sceneInfo[i].scrollHeight}px`; // scroll-section 엘리먼트의 높이를 그 scrollHeight 값 (실제 window.innerHeight의 5배) 으로 세팅 해준다
    }

    yOffset = window.pageYOffset; //전체 페이지 스크롤 값을 간단하게 쓰기위해서 변수로 할당
    let totalScrollHeight = 0;
    for (let i = 0; i < sceneInfo.length; i++) {
      totalScrollHeight += sceneInfo[i].scrollHeight;
      if (totalScrollHeight >= yOffset) {
        currentScene = i;
        break;
      }
    }
    document.body.setAttribute('id', `show-scene-${currentScene}`)

    const heightRatio = window.innerHeight / 1080;
    sceneInfo[0].objs.canvas.style.transform = `translate3d(-50%, -50%, 0) scale(${heightRatio})`, //창 사이즈 높이에 딱 맞춰서 캔버스 크기를 조정
      sceneInfo[2].objs.canvas.style.transform = `translate3d(-50%, -50%, 0) scale(${heightRatio})` //2번 씬의 들어갈 캔버스 크기를 조정
  }

  function calcValues(values, currentYOffset) {
    let rv;

    const scrollHeight = sceneInfo[currentScene].scrollHeight
    const scrollRatio = currentYOffset / scrollHeight //현재씬에서 스크롤된 범위를 비율로 구하기

    if (values.length === 3) {
      //start~end 사이에 애니메이션 실행
      //부분 스크롤된 비율을 반영
      const partScrollStart = values[2].start * scrollHeight;
      const partScrollEnd = values[2].end * scrollHeight;
      const partScrollHeight = partScrollEnd - partScrollStart;

      if (currentYOffset >= partScrollStart && currentYOffset <= partScrollEnd) {
        rv = (currentYOffset - partScrollStart) / partScrollHeight * (values[1] - values[0]) + values[0]
      } else if (currentYOffset < partScrollHeight) {
        rv = values[0];
      } else if (currentYOffset > partScrollEnd) {
        rv = values[1];
      }

    }

    else {
      //현재 씬의 전체범위에서 현재 스크롤된 비율을 곱한것
      rv = scrollRatio * (values[1] - values[0]) + values[0];
    }
    return rv;

  }

  function playAnimation() {
    const objs = sceneInfo[currentScene].objs; //위에 scenceInfo 배열 안에 있는 objs = html dom객체 요소들
    const values = sceneInfo[currentScene].values; // 위에 scenceInfo 배열 안에 있는 values = 처음과 끝에 적용될 opacity(투명도)
    const currentYOffset = yOffset - prevScrollHeight; // 현재 스크롤 위치 = (전체 스크롤 값) - (이미 지나간 스크롤 값)
    const scrollHeight = sceneInfo[currentScene].scrollHeight;
    const scrollRatio = currentYOffset / scrollHeight; //현재 씬에서 얼만큼 스크롤을 했는지 비율로

    switch (currentScene) {
      case 0:
        // console.log('0 play');
        let sequence = Math.round(calcValues(values.imageSequence, currentYOffset));
        objs.context.drawImage(objs.videoImages[sequence], 0, 0); // x,y는 0,0위치에다가 캔버스를 그리기 시작한다
        objs.canvas.style.opacity = calcValues(values.canvas_opacity, currentYOffset);


        if (scrollRatio <= 0.22) {
          // in
          objs.messageA.style.opacity = calcValues(values.messageA_opacity_in, currentYOffset);
          objs.messageA.style.transform = `translate3d(0, ${calcValues(values.messageA_translateY_in, currentYOffset)}%, 0)`;
        } else {
          // out
          objs.messageA.style.opacity = calcValues(values.messageA_opacity_out, currentYOffset);
          objs.messageA.style.transform = `translate3d(0, ${calcValues(values.messageA_translateY_out, currentYOffset)}%, 0)`;
        }

        if (scrollRatio <= 0.42) {
          // in
          objs.messageB.style.opacity = calcValues(values.messageB_opacity_in, currentYOffset);
          objs.messageB.style.transform = `translate3d(0, ${calcValues(values.messageB_translateY_in, currentYOffset)}%, 0)`;
        } else {
          // out
          objs.messageB.style.opacity = calcValues(values.messageB_opacity_out, currentYOffset);
          objs.messageB.style.transform = `translate3d(0, ${calcValues(values.messageB_translateY_out, currentYOffset)}%, 0)`;
        }

        if (scrollRatio <= 0.62) {
          // in
          objs.messageC.style.opacity = calcValues(values.messageC_opacity_in, currentYOffset);
          objs.messageC.style.transform = `translate3d(0, ${calcValues(values.messageC_translateY_in, currentYOffset)}%, 0)`;
        } else {
          // out
          objs.messageC.style.opacity = calcValues(values.messageC_opacity_out, currentYOffset);
          objs.messageC.style.transform = `translate3d(0, ${calcValues(values.messageC_translateY_out, currentYOffset)}%, 0)`;
        }

        if (scrollRatio <= 0.82) {
          // in
          objs.messageD.style.opacity = calcValues(values.messageD_opacity_in, currentYOffset);
          objs.messageD.style.transform = `translate3d(0, ${calcValues(values.messageD_translateY_in, currentYOffset)}%, 0)`;
        } else {
          // out
          objs.messageD.style.opacity = calcValues(values.messageD_opacity_out, currentYOffset);
          objs.messageD.style.transform = `translate3d(0, ${calcValues(values.messageD_translateY_out, currentYOffset)}%, 0)`;
        }

        break;

      case 2:
        // console.log('2 play');
        let sequence2 = Math.round(calcValues(values.imageSequence, currentYOffset));
        objs.context.drawImage(objs.videoImages[sequence2], 0, 0);

        if (scrollRatio <= 0.5) {
          //in
          objs.canvas.style.opacity = calcValues(values.canvas_opacity_in, currentYOffset);
        }
        else {
          //out
          objs.canvas.style.opacity = calcValues(values.canvas_opacity_out, currentYOffset);
        }

        if (scrollRatio <= 0.32) {
          // in
          objs.messageA.style.opacity = calcValues(values.messageA_opacity_in, currentYOffset);
          objs.messageA.style.transform = `translate3d(0, ${calcValues(values.messageA_translateY_in, currentYOffset)}%, 0)`;
        } else {
          // out
          objs.messageA.style.opacity = calcValues(values.messageA_opacity_out, currentYOffset);
          objs.messageA.style.transform = `translate3d(0, ${calcValues(values.messageA_translateY_out, currentYOffset)}%, 0)`;
        }

        if (scrollRatio <= 0.67) {
          // in
          objs.messageB.style.transform = `translate3d(0, ${calcValues(values.messageB_translateY_in, currentYOffset)}%, 0)`;
          objs.messageB.style.opacity = calcValues(values.messageB_opacity_in, currentYOffset);
          objs.pinB.style.transform = `scaleY(${calcValues(values.pinB_scaleY, currentYOffset)})`;
        } else {
          // out
          objs.messageB.style.transform = `translate3d(0, ${calcValues(values.messageB_translateY_out, currentYOffset)}%, 0)`;
          objs.messageB.style.opacity = calcValues(values.messageB_opacity_out, currentYOffset);
          objs.pinB.style.transform = `scaleY(${calcValues(values.pinB_scaleY, currentYOffset)})`;
        }

        if (scrollRatio <= 0.93) {
          // in
          objs.messageC.style.transform = `translate3d(0, ${calcValues(values.messageC_translateY_in, currentYOffset)}%, 0)`;
          objs.messageC.style.opacity = calcValues(values.messageC_opacity_in, currentYOffset);
          objs.pinC.style.transform = `scaleY(${calcValues(values.pinC_scaleY, currentYOffset)})`;
        } else {
          // out
          objs.messageC.style.transform = `translate3d(0, ${calcValues(values.messageC_translateY_out, currentYOffset)}%, 0)`;
          objs.messageC.style.opacity = calcValues(values.messageC_opacity_out, currentYOffset);
          objs.pinC.style.transform = `scaleY(${calcValues(values.pinC_scaleY, currentYOffset)})`;
        }


        // currentScene 3에서 쓰는 캔버스를 미리 그려주기 시작



        if (scrollRatio > 0.9) {
          const objs = sceneInfo[3].objs;
          const values = sceneInfo[3].values;
          const widthRatio = window.innerWidth / objs.canvas.width; //원래 캔버스 크기 / 브라우저의 폭
          const heightRatio = window.innerHeight / objs.canvas.height; //원래 캔버스 크기 / 브라우저의 높이
          let canvasScaleRatio;

          if (widthRatio <= heightRatio) {
            // 캔버스보다 브라우저 창이 홀쭉한 경우
            canvasScaleRatio = heightRatio;
          }
          else {
            // 캔버스보다 브라우저 창이 납작한 경우
            canvasScaleRatio = widthRatio;
          }
          objs.canvas.style.transform = `scale(${canvasScaleRatio})`;
          objs.context.fillStyle = 'white';
          objs.context.drawImage(objs.images[0], 0, 0);

          // 캔버스 사이즈에 맞춰 가정한 innerWidth와 innerHeight
          const recalculatedInnerWidth = document.body.offsetWidth / canvasScaleRatio;
          const recalculatedInnerHeight = window.innerHeight / canvasScaleRatio;

          //처음 애니메이션이 시작하는 위치를 할당해주기 위해서 사용, 근데 딱 값이 비어있을 때 처음에만 세팅해주고 그 이후에는 값이 변하지 않음

          const whiteRectWidth = recalculatedInnerWidth * 0.15;
          values.rect1X[0] = (objs.canvas.width - recalculatedInnerWidth) / 2; //출발값 //(objs.canvas.width = 1920 캔버스 원래 크기 - 다시계산된 넓이) / 2
          values.rect1X[1] = values.rect1X[0] - whiteRectWidth; //최종값 //시작하는 위치에서 흰색 박스가 밖으로 나가게끔 위치를 박스크기만큼 x좌표로 -시켜준다
          values.rect2X[0] = values.rect1X[0] + recalculatedInnerWidth - whiteRectWidth; //오른쪽에 위치한 박스이기 때문에 왼쪽 박스의 시작점부터 계산된 넓이를 더한다음, 안쪽에서 시작해야하기 때문에 자신의 흰색박스만큼 빼준다,. 거기서 시작
          values.rect2X[1] = values.rect2X[0] + whiteRectWidth; //오른쪽 박스의 최종위치 , 밖깥으로 아예 나가야하기 때문에 자신의 크기만큼 시작위치에서 + 위치로 가야한다

          //좌우 흰색 박스 그리기          x          ,y,         width           ,         height(어차피 꽉 채울꺼라서 canvas 높이만큼)
          // objs.context.fillRect(values.rect1X[0], 0, parseInt(whiteRectWidth), objs.canvas.height);
          // objs.context.fillRect(values.rect2X[0], 0, parseInt(whiteRectWidth), objs.canvas.height);
          objs.context.fillRect(
            parseInt(values.rect1X[0]),
            0,
            parseInt(whiteRectWidth),
            objs.canvas.height
          );
          objs.context.fillRect(
            parseInt(values.rect2X[0]),
            0,
            parseInt(whiteRectWidth),
            objs.canvas.height
          );

        }

        break;

      case 3:
        // console.log('3 play');
        // 가로/세로 모두 꽉 차게 하기 위해 여기서 세팅(계산 필요)
        let stet = 0;
        const widthRatio = window.innerWidth / objs.canvas.width; //원래 캔버스 크기 / 브라우저의 폭
        const heightRatio = window.innerHeight / objs.canvas.height; //원래 캔버스 크기 / 브라우저의 높이
        let canvasScaleRatio;

        if (widthRatio <= heightRatio) {
          // 캔버스보다 브라우저 창이 홀쭉한 경우
          canvasScaleRatio = heightRatio;
        }
        else {
          // 캔버스보다 브라우저 창이 납작한 경우
          canvasScaleRatio = widthRatio;
        }
        objs.canvas.style.transform = `scale(${canvasScaleRatio})`;
        objs.context.fillStyle = 'white';
        objs.context.drawImage(objs.images[0], 0, 0); // (들어갈 이미지, x, y)

        // 캔버스 사이즈에 맞춰 가정한 innerWidth와 innerHeight
        const recalculatedInnerWidth = document.body.offsetWidth / canvasScaleRatio;
        const recalculatedInnerHeight = window.innerHeight / canvasScaleRatio;

        //처음 애니메이션이 시작하는 위치를 할당해주기 위해서 사용, 근데 딱 값이 비어있을 때 처음에만 세팅해주고 그 이후에는 값이 변하지 않음
        if (!values.rectStartY) {
          //objs.canvas.getBoundingClientRect().top;
          values.rectStartY = objs.canvas.offsetTop + (objs.canvas.height - objs.canvas.height * canvasScaleRatio) / 2; //흰색 박스가 맨~~~위에서 얼마나 떨어져있느냐(고정값) 
          values.rect1X[2].start = (window.innerHeight / 2) / scrollHeight; //왼쪽 흰색 박스 / 현재 scrollheight는 원래 height의 5배로 섹션의 높이를 잡아놨음
          values.rect2X[2].start = (window.innerHeight / 2) / scrollHeight; //오른쪽 흰색 박스
          values.rect1X[2].end = values.rectStartY / scrollHeight; //현재 씬의 전체 스크롤에서 애니메이션이 시작되는 지점을 나눈다
          values.rect2X[2].end = values.rectStartY / scrollHeight;
        }

        const whiteRectWidth = recalculatedInnerWidth * 0.15;
        values.rect1X[0] = (objs.canvas.width - recalculatedInnerWidth) / 2; //출발값 //(objs.canvas.width = 1920 캔버스 원래 크기 - 다시계산된 넓이) / 2
        values.rect1X[1] = values.rect1X[0] - whiteRectWidth; //최종값 //시작하는 위치에서 흰색 박스가 밖으로 나가게끔 위치를 박스크기만큼 x좌표로 -시켜준다
        values.rect2X[0] = values.rect1X[0] + recalculatedInnerWidth - whiteRectWidth; //오른쪽에 위치한 박스이기 때문에 왼쪽 박스의 시작점부터 계산된 넓이를 더한다음, 안쪽에서 시작해야하기 때문에 자신의 흰색박스만큼 빼준다,. 거기서 시작
        values.rect2X[1] = values.rect2X[0] + whiteRectWidth; //오른쪽 박스의 최종위치 , 밖깥으로 아예 나가야하기 때문에 자신의 크기만큼 시작위치에서 + 위치로 가야한다

        //좌우 흰색 박스 그리기          x          ,y,         width           ,         height(어차피 꽉 채울꺼라서 canvas 높이만큼)
        // objs.context.fillRect(values.rect1X[0], 0, parseInt(whiteRectWidth), objs.canvas.height);
        // objs.context.fillRect(values.rect2X[0], 0, parseInt(whiteRectWidth), objs.canvas.height);

        //fillRect => 캔버스에서 사각형을 그리는 메소드
        objs.context.fillRect(
          parseInt(calcValues(values.rect1X, currentYOffset)),
          0,
          parseInt(whiteRectWidth),
          objs.canvas.height
        );
        objs.context.fillRect(
          parseInt(calcValues(values.rect2X, currentYOffset)),
          0,
          parseInt(whiteRectWidth),
          objs.canvas.height
        );

        //캔버스가 브라우저 상단에 닿지 않았다면

        if (scrollRatio < values.rect1X[2].end) {
          step = 1;
          objs.canvas.classList.remove('sticky') //css에서 sticky를 붙였을 때 position을 fixed로 바꾸도록 미리 설정
          // console.log('캔버스 닿기전')

        }
        else {
          //캔버스가 브라우저 상단에 닿았다면
          //이미지 블랜드
          step = 2;
          // imageBlendY: [0, 0, { start: 0, end: 0 }]
          // objs.context.drawImage(img, x, y, width, height)
          values.blendHeight[0] = 0; //초기값
          values.blendHeight[1] = objs.canvas.height;
          values.blendHeight[2].start = values.rect1X[2].end // 1분이 사진이 sticky되어서 사진이 fixed가 되었을때 시작
          values.blendHeight[2].end = values.blendHeight[2].start + 0.2; //스타트가 시작되는 순간부터 20%를 더 스크롤 하는 구간까지 이미지 블랜드 처리를 한다

          const blendHeight = calcValues(values.blendHeight, currentYOffset);
          objs.context.drawImage(objs.images[1], //바다사진을 그린다
            0, objs.canvas.height - blendHeight, objs.canvas.width, blendHeight,
            0, objs.canvas.height - blendHeight, objs.canvas.width, blendHeight
          );

          objs.canvas.classList.add('sticky') //위에서 sticky지웠으니까 상담에 닿았을 때 다시 붙여주기
          //위에서 스케일이 조정되었기 때문에 sticky되는 시점이 시각적으로 봤을 때 top이 떨어져있는 형태, 그래서 scale이 줄어든 비율을 그대로 이용해서 top을 -방향으로 끌어올려줌
          objs.canvas.style.top = `${-(objs.canvas.height - objs.canvas.height * canvasScaleRatio) / 2}px`

          // 이미지 블랜드가 끝난 다음(축소시작)
          if (scrollRatio > values.blendHeight[2].end) {
            // canvasScaleRatio = window.innerHeight / objs.canvas.height (브라우저 높이에 비례하여 꽉차게)
            values.canvas_scale[0] = canvasScaleRatio; // 초기의 바다사진 캔버스의 스케일 (애니메이션 초기값 = 스크롤될때 전체화면을 꽉채우는걸로 시작) 
            values.canvas_scale[1] = document.body.offsetWidth / (1.5 * objs.canvas.width) //끝날때 바다사진 캔버스의 스케일 ( 원래 캔버스 폭에대한 바디 사이즈의 비율 (애니메이션 최종값 = 원본에서 1.5배만큼 줄어든 width를 기준으로) )

            values.canvas_scale[2].start = values.blendHeight[2].end //블랜드가 꼭대기에 top에 딱 갔을때
            values.canvas_scale[2].end = values.canvas_scale[2].start + 0.2; //이 씬에서 시작된 이후에 얼마나 재생될지, 20%되는 구간동안 진행됨

            objs.canvas.style.transform = `scale(${calcValues(values.canvas_scale, currentYOffset)})`; //위에서 계산한 값들을 실제로 넣어서 적용시킴
            objs.canvas.style.marginTop = 0;
          }

          // 현재 씬에서 얼만큼 스크롤을 했는지 비율 > 스크롤이 다되어서 지정했던 켄버스 스케일이 작아진 이후 && 시작조차 안되어서 초기값일때가 아니라 실제로 캔버스 스케일이 작아진경우
          if (scrollRatio > values.canvas_scale[2].end && values.canvas_scale[2].end > 0) {
            objs.canvas.classList.remove('sticky'); //다시 스크롤 되기 위해 position fixed를 지우고 다시 static으로 되돌린다
            objs.canvas.style.marginTop = `${scrollHeight * 0.4}px` //시작할때 20%구간동안 올라가고, 다 올라갔을때 20%구간동안 작아지기 때문에 지금까지 스크롤된 구간은 40%, 이걸 해주지 않으면 fixed가 풀릴때 그림의 위치가 엄청위에 가있음

            values.canvasCaption_opacity[2].start = values.canvas_scale[2].end; //마지막에 나오는 텍스트들
            values.canvasCaption_opacity[2].end = values.canvasCaption_opacity[2].start + 0.1;

            values.canvasCaption_translateY[2].start = values.canvasCaption_opacity[2].start;
            values.canvasCaption_translateY[2].end = values.canvasCaption_opacity[2].end;

            objs.canvasCaption.style.opacity = calcValues(values.canvasCaption_opacity, currentYOffset);
            objs.canvasCaption.style.transform = `translate3d(0, ${calcValues(values.canvasCaption_translateY, currentYOffset)}%, 0)`

          }
        }


        break;
    }
  }


  function scrollLoop() {
    enterNewscene = false;
    prevScrollHeight = 0;
    // console.log(window.pageYOffset) // 현재 스크롤한 위치를 알 수 있음
    for (let i = 0; i < currentScene; i++) {
      prevScrollHeight += sceneInfo[i].scrollHeight; // 지나간 스크롤의 합 = 이전에 지나간 스크롤 값 + 현재 씬의(걸쳐져있는) 스크롤 값, sceneInfo[i].scrollHeight은 실제 window.innerHeight의 5배로 세팅되어있음
    }

    if (yOffset > prevScrollHeight + sceneInfo[currentScene].scrollHeight) {
      enterNewscene = true;
      currentScene++;
      document.body.setAttribute('id', `show-scene-${currentScene}`); //currentScene의 값이 바뀔때만 애니메이션이 세팅되도록
    }

    if (yOffset < prevScrollHeight) {
      enterNewscene = true;
      if (currentScene === 0) return; //브라우저 바운스 효과로 인해 마이너스가 되는 것을 방지(모바일)
      currentScene--;
      document.body.setAttribute('id', `show-scene-${currentScene}`); //currentScene의 값이 바뀔때만 애니메이션이 세팅되도록
    }

    if (enterNewscene) return; //씬이 바뀌는 순간에 갑자기 잠깐 숫자가 음수가 되거나 하는 경우가 있기 때문에, enterNewscene가 true가 된 순간(씬이 바뀐순간)에는 잠깐 playAnimation를 거른다(return이 되기 때문에 밑에는 전역은 실행안됨)

    playAnimation();



  }

  window.addEventListener('scroll', () => {
    yOffset = window.pageYOffset;
    scrollLoop();
    checkMenu();
  })
  // window.addEventListener('DOMContentLoaded', setLayout); //페이지가 켜지자 마자 setLayout이 실행됨, load보다 실행속도가 빠름, 로컬에서는 별 차이가 없고 실제 배포할때는 의미가 있을듯
  window.addEventListener('load', () => {
    setLayout();
    sceneInfo[0].objs.context.drawImage(sceneInfo[0].objs.videoImages[0], 0, 0);
  }); //로드됬을 때 
  window.addEventListener('resize', setLayout); //전체 화면의 사이즈가 변할때 마다 setLayout이 실행되어서, 각 스크롤 영역의 높이도 계속해서 변한다


  // setLayout(); //그냥 실행하면 처음에만 각 스크롤의 영역이 잡힌다
  setCanvasImages()


})();