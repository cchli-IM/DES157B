(function () {
    "use strict";
  
    gsap.registerPlugin(ScrollTrigger, Draggable);
  
    async function loadSVG(containerId, filePath) {
      const response = await fetch(filePath);
      const svgText = await response.text();
      const el = document.querySelector("#" + containerId);
      if (el) el.innerHTML = svgText;
    }
  
    window.addEventListener("load", async function () {

            await Promise.all([
                loadSVG("scene1-wolf", "images/characters/wolf.svg"),
                loadSVG("scene2-wolf", "images/characters/wolf.svg"),
                loadSVG("scene3-wolf", "images/characters/wolf.svg"),
                loadSVG("scene4-wolf", "images/characters/wolf.svg"),
                loadSVG("scene5-wolf", "images/characters/wolf.svg"),
                loadSVG("scene6-wolf", "images/characters/wolf.svg"),
                loadSVG("scene7-wolf", "images/characters/wolf.svg"),
                loadSVG("scene2-pig1", "images/characters/pig1.svg"),
                loadSVG("scene3-pig1", "images/characters/pig1.svg"),
                loadSVG("scene4-pig1", "images/characters/pig1.svg"),
                loadSVG("scene2-pig2", "images/characters/pig2.svg"),
                loadSVG("scene3-pig2", "images/characters/pig2.svg"),
                loadSVG("scene5-pig2", "images/characters/pig2.svg"),
                loadSVG("scene2-pig3", "images/characters/pig3.svg"),
                loadSVG("scene3-pig3", "images/characters/pig3.svg"),
                loadSVG("scene6-pig3", "images/characters/pig3.svg"),
                loadSVG("scene7-pig3", "images/characters/pig3.svg"),
            ]);

            const track = document.querySelector("#track");
            const vw = window.innerWidth;

            const animDist = vw * 2;
            const travelDist = vw * 0.8;
            const numScenes = 7;
            const numTravels = numScenes - 1;
            const totalScroll = (animDist * numScenes) + (travelDist * numTravels);

     
            ScrollTrigger.create({
                trigger: "#track-container",
                pin: true,
                start: "top top",
                end: `+=${totalScroll}`,
                scrub: false,
            });


            for (let i = 0; i < numTravels; i++) {
                const travelStart = animDist * (i + 1) + travelDist * i;
                const travelEnd = travelStart + travelDist;
                const targetX = -(vw * (i + 1));

                ScrollTrigger.create({
                    trigger: "body",
                    start: travelStart,
                    end: travelEnd,
                    scrub: 1,
                    onUpdate: function (self) {
                        const prevX = -(vw * i);
                        gsap.set(track, { x: prevX + (targetX - prevX) * self.progress });
                    },
                });
            }

            function sceneAnim(sceneIndex, tl) {
                const animStart = animDist * sceneIndex + travelDist * sceneIndex;
                const animEnd = animStart + animDist;
                ScrollTrigger.create({
                    trigger: "body",
                    start: animStart,
                    end: animEnd,
                    scrub: 1,
                    onUpdate: function (self) { tl.progress(self.progress); },
                });
            }

        
            const tl1 = gsap.timeline({ paused: true });
            tl1.fromTo("#scene1-wolf",
                { x: -400 },
                { x: 0, ease: "none", duration: 1 }
            );

    
            const tl2 = gsap.timeline({ paused: true });
            tl2
                .fromTo("#scene2-wolf",
                    { x: -300 }, { x: 0, ease: "none", duration: 1 }
                );

            const tl3 = gsap.timeline({ paused: true });
            tl3
                .to("#scene3-pig1", { x: -vw * 0.05, opacity: 0, ease: "none", duration: 1 })
                .to("#scene3-pig2", { x: -vw * 0.08, opacity: 0, ease: "none", duration: 1 }, 0)
                .to("#scene3-pig3", { x: -vw * 0.09, opacity: 0, ease: "none", duration: 1 }, 0)
                .to("#scene3-wolf", { x: 150, ease: "none", duration: 1 }, 0);

       
            gsap.set("#scene4-pig1", { opacity: 0 });
            const tl4 = gsap.timeline({ paused: true });
            tl4
                .to("#scene4-wolf", { rotation: -18, transformOrigin: "bottom center", ease: "none", duration: 0.2 })
                .to("#scene4-wolf", { rotation: 0, ease: "none", duration: 0.2 })
                .to("#s4-strawhome", { x: 800, rotation: 30, opacity: 0, ease: "none", duration: 0.4 })
                .to("#scene4-pig1", { opacity: 1, ease: "none", duration: 0 })
                .to("#drag-prompt4", { opacity: 1, ease: "none", duration: 0.2 });

            gsap.set("#scene5-pig2", { opacity: 0 });
            const tl5 = gsap.timeline({ paused: true });
            tl5
                .to("#scene5-wolf", { rotation: -18, transformOrigin: "bottom center", ease: "none", duration: 0.15 })
                .to("#scene5-wolf", { rotation: 0, ease: "none", duration: 0.15 })
                .to("#scene5-wolf", { rotation: -18, ease: "none", duration: 0.15 })
                .to("#scene5-wolf", { rotation: 0, ease: "none", duration: 0.15 })
                .to("#s5-stickhouse", { x: 800, rotation: 30, opacity: 0, ease: "none", duration: 0.4 })
                .to("#scene5-pig2", { opacity: 1, ease: "none", duration: 0 })
                .to("#drag-prompt5", { opacity: 1, ease: "none", duration: 0.2 });

            const tl6 = gsap.timeline({ paused: true });
            tl6
                .to("#scene6-wolf", { rotation: -18, transformOrigin: "bottom center", ease: "none", duration: 0.15 })
                .to("#scene6-wolf", { rotation: 0, ease: "none", duration: 0.15 })
                .to("#scene6-wolf", { rotation: -18, ease: "none", duration: 0.15 })
                .to("#scene6-wolf", { rotation: 0, ease: "none", duration: 0.15 })
                .to("#scene6-wolf", { rotation: -18, ease: "none", duration: 0.15 })
                .to("#scene6-wolf", { rotation: 0, ease: "none", duration: 0.15 })
                .to("#scene6-wolf", { x: -200, ease: "none", duration: 0.4 });

    
            gsap.set("#scene7-pig3", { opacity: 0 });
            gsap.set("#cannonball-svg", { opacity: 0 });
            const tl7 = gsap.timeline({ paused: true });
            tl7
                .fromTo(["#scene7-wolf", "#cannon"],
                    { x: -400 }, { x: 0, ease: "none", duration: 0.6 }
                )
                .to("#fire-btn", { opacity: 1, ease: "none", duration: 0.4 });

            sceneAnim(0, tl1);
            sceneAnim(1, tl2);
            sceneAnim(2, tl3);
            sceneAnim(3, tl4);
            sceneAnim(4, tl5);
            sceneAnim(5, tl6);
            sceneAnim(6, tl7);

            const fireBtn = document.querySelector("#fire-btn");
            if (fireBtn) {
                fireBtn.addEventListener("click", function () {
                    this.disabled = true;
                    this.style.display = "none";

                    const ball = document.querySelector("#cannonball-svg");
                    const house = document.querySelector("#s7-brickhouse");
                    const pig = document.querySelector("#scene7-pig3");

            
                    gsap.set(ball, { opacity: 1 });
                    gsap.to(ball, { x: 380, duration: 0.9, ease: "none" });
                    gsap.to(ball, {
                        y: -80, duration: 0.45, ease: "power2.out", yoyo: true, repeat: 1,
                        onComplete: function () {
             
                            gsap.to(ball, { x: "+=600", y: -200, opacity: 0, duration: 0.7, ease: "power2.in" });
                            gsap.to(house, {
                                x: 900, rotation: 25, opacity: 0, duration: 0.7, ease: "power2.in",
                                onComplete: function () {
                          
                                    gsap.set(pig, { opacity: 1 });
                                    gsap.to("#drag-prompt7", { opacity: 1, duration: 0.3, delay: 0.2 });
                                }
                            });
                        }
                    });
                });
            }

 
            const pigWolfPairs = [
                { pig: "#scene4-pig1", wolf: "#scene4-wolf" },
                { pig: "#scene5-pig2", wolf: "#scene5-wolf" },
                { pig: "#scene7-pig3", wolf: "#scene7-wolf" },
            ];

            pigWolfPairs.forEach(function ({ pig, wolf }) {
                const pigEl = document.querySelector(pig);
                const wolfEl = document.querySelector(wolf);
                if (!pigEl || !wolfEl) return;

                Draggable.create(pigEl, {
                    type: "x,y",
                    inertia: true,
                    onDragEnd: function () {
                        const pr = pigEl.getBoundingClientRect();
                        const wr = wolfEl.getBoundingClientRect();

                        const overlaps = !(
                            pr.right < wr.left ||
                            pr.left > wr.right ||
                            pr.bottom < wr.top ||
                            pr.top > wr.bottom
                        );

                        if (overlaps) {
                            const wolfCenterX = wr.left + wr.width * 0.5;
                            const wolfCenterY = wr.top + wr.height * 0.5;
                            const pigCenterX = pr.left + pr.width * 0.5;
                            const pigCenterY = pr.top + pr.height * 0.5;

                            const currentX = gsap.getProperty(pigEl, "x");
                            const currentY = gsap.getProperty(pigEl, "y");

                            gsap.to(pigEl, {
                                x: currentX + (wolfCenterX - pigCenterX),
                                y: currentY + (wolfCenterY - pigCenterY),
                                scale: 0,
                                opacity: 0,
                                duration: 0.45,
                                ease: "power2.in",
                                onComplete: function () {
                         
                                    gsap.to(wolfEl, {
                                        y: -25, yoyo: true, repeat: 3, duration: 0.14, ease: "power1.inOut"
                                    });
                                }
                            });
                        }
                    }
                });
            });

            ScrollTrigger.refresh();
            console.log("Ready. Total scroll:", totalScroll + "px");
        });
  
  })();