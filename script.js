gsap.registerPlugin(ScrollTrigger);

window.addEventListener('load', () => {
    // 載入動畫序列
    const tl = gsap.timeline();
    
    // 處理載入畫面
    tl.to('.loader', {
        opacity: 0,
        duration: 0.5,
        onComplete: () => {
            document.querySelector('.loader').style.display = 'none';
        }
    });

    // 顯示第一個文字區塊
    gsap.to('.text-block-1', {
        opacity: 1,
        visibility: 'visible',
        duration: 1,
        delay: 0.5
    });
});
// 載入動畫
// 設置初始動畫
window.addEventListener('load', () => {
    // 初始化視頻縮放
    gsap.set('.video-container', {
        scale: 1.2
    });

    // 載入動畫序列
    const tl = gsap.timeline();
    tl.to('.loader', {
        opacity: 0,
        duration: 0.5,
        onComplete: () => {
            document.querySelector('.loader').style.display = 'none';
        }
    })
    .from('.text-block-1', {
        opacity: 0,
        y: 50,
        duration: 1,
        delay: 0.5
    })
    .from('.text-block-2', {
        opacity: 0,
        y: 50,
        duration: 1
    })
    .from('.text-block-3', {
        opacity: 0,
        y: 50,
        duration: 1
    });
});



// 滾動視差效果
ScrollTrigger.create({
    trigger: '.hero',
    start: 'top top',
    end: 'bottom top',
    scrub: true,
    onUpdate: self => {
        gsap.to('.video-container', {
            scale: 1 + (self.progress * 0.2),
            duration: 0.5
        });
    }
});
// 文字塊滾動動畫
const textBlocks = document.querySelectorAll('.text-block');

textBlocks.forEach((block, index) => {
    ScrollTrigger.create({
        trigger: '.hero',
        start: `${index * 33}% top`,
        end: `${(index + 1) * 33}% center`,
        scrub: 1,
        onEnter: () => {
            block.style.opacity = 1;
            block.style.visibility = 'visible';
        },
        onLeave: () => {
            block.style.opacity = 0;
            block.style.visibility = 'hidden';
        },
        onEnterBack: () => {
            block.style.opacity = 1;
            block.style.visibility = 'visible';
        },
        onLeaveBack: () => {
            block.style.opacity = 0;
            block.style.visibility = 'hidden';
        }
    });
});
// 選單控制
const menuToggle = document.querySelector('.menu-toggle');
const verticalNav = document.querySelector('.vertical-nav');
const navItems = document.querySelectorAll('.nav-item');
// 點擊選單項目時關閉選單
navItems.forEach(item => {
    item.addEventListener('click', () => {
        document.body.classList.remove('nav-active');
        verticalNav.classList.remove('active');
    });
});
// 導覽連結功能
document.querySelectorAll('.nav-item').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        
        // 獲取目標區塊
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            // 關閉選單
            document.body.classList.remove('nav-active');
            verticalNav.classList.remove('active');
            
            // 使用 GSAP 進行平滑滾動
            gsap.to(window, {
                duration: 1,
                scrollTo: {
                    y: targetSection,
                    offsetY: 80
                },
                ease: "power2.inOut"
            });
        }
    });
});
// ESC 鍵關閉選單
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        document.body.classList.remove('nav-active');
        verticalNav.classList.remove('active');
    }
});
// 點擊 ESC 鍵關閉選單
//document.addEventListener('keydown', (e) => {
    //if (e.key === 'Escape') {
        //verticalNav.classList.remove('active');
    //}
//});
// 選單開關切換
// 選單開關切換
menuToggle.addEventListener('click', () => {
    document.body.classList.toggle('nav-active');
    verticalNav.classList.toggle('active');
});
// 平滑滾動
navItems.forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            gsap.to(window, {
                duration: 1,
                scrollTo: {
                    y: targetSection,
                    offsetY: 50
                },
                ease: 'power2.inOut'
            });
        }
    });
});


// 滾動效果
document.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const video = document.querySelector('video');
    
    // 視差滾動效果
    if (video) {
        video.style.transform = `scale(${1 + scrolled * 0.0003})`;
    }

    // 章節卡片動畫
    document.querySelectorAll('.chapter-card').forEach(card => {
        const cardTop = card.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (cardTop < windowHeight * 0.8) {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }
    });

    // 人物卡片動畫
    document.querySelectorAll('.character').forEach(char => {
        const charTop = char.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (charTop < windowHeight * 0.8) {
            char.style.opacity = '1';
            char.style.transform = 'translateY(0)';
        }
    });
});

// 滾動動畫（使用 GSAP ScrollTrigger）
gsap.utils.toArray('.chapter-card').forEach(card => {
    gsap.from(card, {
        scrollTrigger: {
            trigger: card,
            start: 'top 80%',
            end: 'top 20%',
            scrub: 1
        },
        y: 50,
        opacity: 0,
        duration: 1
    });
});

// 文字淡入效果
gsap.utils.toArray('.about-text p').forEach(text => {
    gsap.from(text, {
        scrollTrigger: {
            trigger: text,
            start: 'top 80%',
            end: 'top 50%',
            scrub: 1
        },
        y: 20,
        opacity: 0,
        duration: 1
    });
});

// 平滑滾動
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            gsap.to(window, {
                duration: 1,
                scrollTo: {
                    y: target,
                    offsetY: 50
                },
                ease: 'power2.inOut'
            });
            
            // 如果選單是開啟的，則關閉它
            if (menuOverlay.classList.contains('active')) {
                menuOverlay.classList.remove('active');
                gsap.to(menuItems, {
                    opacity: 0,
                    y: 20,
                    duration: 0.3
                });
            }
        }
    });
});

// 視差滾動效果
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const video = document.querySelector('.video-container');
    
    if (video) {
        video.style.transform = `translateY(${scrolled * 0.5}px)`; // 視差效果
        video.querySelector('video').style.transform = `scale(${1.1 + scrolled * 0.0001})`; // 緩慢放大效果
    }
});

// 章節區塊動畫
document.querySelectorAll('.chapter-section').forEach(section => {
    const sectionTop = section.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    
    if (sectionTop < windowHeight * 0.8) {
        section.classList.add('visible');
    }
});

// 選書動機文字動畫
gsap.utils.toArray('.motivation-text p').forEach((text, index) => {
    gsap.from(text, {
        scrollTrigger: {
            trigger: text,
            start: 'top 80%',
            end: 'top 60%',
            scrub: 1
        },
        opacity: 0,
        y: 30,
        duration: 1,
        delay: index * 0.2
    });
});

// 人物區塊動畫
gsap.utils.toArray('.character-item').forEach((character, index) => {
    gsap.from(character, {
        scrollTrigger: {
            trigger: character,
            start: 'top 80%',
            end: 'top 50%',
            scrub: 1,
            onEnter: () => character.classList.add('visible'),
            onLeaveBack: () => character.classList.remove('visible')
        },
        y: 50,
        opacity: 0,
        duration: 1,
        delay: index * 0.2
    });
});