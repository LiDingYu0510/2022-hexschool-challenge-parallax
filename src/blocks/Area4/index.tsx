import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import './area4.scss';
import { raceDetailList, raceInfoList } from '../../utils/const';
import judgeTextImg from '../../assets/section04/section07_icon03_1.png';
import prizeTextImg from '../../assets/section04/section07_icon02_1.png';
import bgTextImg from '../../assets/section04/section07_bg_text.png';
import { RaceDetail, RaceInfo } from '../../utils/type';

export default function Area4() {
    gsap.registerPlugin(ScrollTrigger);
    const container = useRef<HTMLDivElement>(null);
    const timeLineRef = useRef<HTMLDivElement>(null);

    const judgeTextRef = useRef<HTMLImageElement>(null);
    const prizeTextRef = useRef<HTMLImageElement>(null);
    const raceInfoRef = useRef<HTMLDivElement>(null);
    const [isPrize, setIsPrize] = useState(true);

    useLayoutEffect(() => {
        const ctx = gsap.context((self) => {
            ScrollTrigger.create({
                trigger: container.current!,
                scrub: true,
                pin: true,
                pinSpacing: true,
                start: 'top top',
                end: 'bottom center', //scroll more 100%height
                markers: false,
                onEnter: (self) => {},
                onUpdate: (self) => {
                    let p = self.progress;
                    if (p > 0.1) {
                        gsap.to(timeLineRef.current!, {
                            xPercent: -98 * (p - 0.1),
                            ease: 'none'
                        });
                    }
                },
                onLeave: (self) => {
                    // console.log('onLeave');
                    setIsPrize((pre) => !pre);
                },
                onEnterBack: (self) => {},
                onScrubComplete: () => {
                    // console.log('onScrubComplete');
                }
            });
        }, container);
        return () => ctx.revert();
    }, []);

    const TimeItemContainer = React.memo((timeItem: RaceInfo) => {
        return (
            <span className="timeline-item">
                <div> {timeItem.title}</div>
                <div style={{ borderBottom: 'solid black' }}>{timeItem.desc}</div>
                <div>
                    {timeItem.startDate}
                    {timeItem.startDetail}
                </div>
                <div>
                    {timeItem.dueDate} {timeItem.dueDetail}
                </div>
            </span>
        );
    });

    const RepeatText = React.memo(({ textData }: any) => {
        const text = textData.repeat(10);
        return <div className="text">{text}</div>;
    });

    useEffect(() => {
        let ctx: gsap.Context;
        if (!isPrize) {
            ctx = gsap.context(() => {
                gsap.to(raceInfoRef.current!, {
                    transform: 'rotate(10deg)',
                    boxShadow: '-10px 10px 5px #2E3966'
                });
                gsap.to(judgeTextRef.current!, {
                    filter: 'blur(3px)'
                });
                gsap.to(prizeTextRef.current!, {
                    filter: 'blur(0px)'
                });
            });
        } else {
            ctx = gsap.context(() => {
                gsap.to(raceInfoRef.current!, {
                    transform: 'rotate(-10deg)',
                    boxShadow: '10px 10px 5px #2E3966'
                });
                gsap.to(judgeTextRef.current!, {
                    filter: 'blur(0px)'
                });
                gsap.to(prizeTextRef.current!, {
                    filter: 'blur(3px)'
                });
            });
        }
        return () => {
            ctx.revert();
        };
    }, [isPrize]);

    type RaceDetailProps = {
        isPrize: boolean;
        item: RaceDetail;
    };
    const RaceDetailItem = React.memo(({ isPrize, item }: RaceDetailProps) => {
        if (isPrize) {
            return (
                <li>
                    <span className="race-info-item">{item.frequent}</span>
                    <p className="race-info-desc">
                        {item.award}
                        <span className="purple">{item.awardNum}</span>
                    </p>
                </li>
            );
        }
        return (
            <li>
                <p className="race-info-item">
                    {item.award}
                    <span className="purple">{item.awardNum}</span>
                </p>

                <span className="race-info-desc">{item.frequent}</span>
            </li>
        );
    });

    return (
        <div className="root4" ref={container}>
            <div className="marquee-area">
                <div className="marquee marquee2">
                    <RepeatText textData={'THEF2E4TH ?? '} />
                    <RepeatText textData={'THEF2E4TH ?? '} />
                </div>
                <div className="marquee marquee1">
                    <RepeatText textData={'THEF2E4TH ?? '} />
                    <RepeatText textData={'THEF2E4TH ?? '} />
                </div>
            </div>
            <div className="timeline-area">
                <div className="timeline" ref={timeLineRef}>
                    {raceInfoList.map((item, index) => {
                        return <TimeItemContainer {...item} key={index} />;
                    })}
                </div>
            </div>
            <div className="race-info-area">
                <div className="bg-text-img">
                    <img src={bgTextImg} alt="" />
                </div>
                <div className="race-info" onMouseEnter={() => setIsPrize(true)}>
                    <div className="text-img judge" ref={judgeTextRef}>
                        <img src={judgeTextImg} alt="" />
                    </div>
                </div>
                <div className="race-info-detail">
                    <div className="race-info-detail-content" ref={raceInfoRef}>
                        <ul>
                            {raceDetailList.map((item, index) => {
                                return <RaceDetailItem isPrize={isPrize} item={item} key={index} />;
                            })}

                            {/* <li>
                                <p className="race-info-item">
                                    ???????????????????????? <span className="purple">????????????</span>
                                </p>

                                <span className="race-info-desc">
                                    ?????????????????????????????? ???????????????
                                </span>
                            </li>
                            <li>
                                <p className="race-info-item">
                                    ??????????????? ????????? <span className="purple">NTD 3,000/???</span>
                                </p>
                                <span className="race-info-desc">?????????2????????????1????????????1???</span>
                            </li>
                            <li>
                                <p className="race-info-item">
                                    ??????????????? ????????? <span className="purple">NTD 10,000/???</span>
                                </p>
                                <span className="race-info-desc">???????????????1???</span>
                            </li> */}
                            <li className="race-info-item">?????????????????????????????????</li>
                        </ul>
                    </div>
                </div>
                <div className="race-info" onMouseEnter={() => setIsPrize(false)}>
                    <div className="text-img prize" ref={prizeTextRef}>
                        <img src={prizeTextImg} alt="" />
                    </div>
                </div>
            </div>
        </div>
    );
}
