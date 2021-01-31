import React, { useState, useCallback, useEffect, useRef } from 'react';
import ReactDOM from "react-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import "../styles/factsheet.css";
import 'swiper/swiper.min.css';
import { CSSTransition } from 'react-transition-group';

const items = [
    {
        title: "A",
        name: "a",
        date: "2020-12-09"
    },
    {
        title: "B",
        name: "b",
        date: "2021-01-09"
    },
    {
        title: "C",
        name: "c",
        date: "2021-02-01"
    },
    {
        title: "D",
        name: "d",
        date: "2021-01-22"
    },
    {
        title: "E",
        name: "e",
        date: "2021-01-28"
    }
]

export default function FactSheet() {
    const [show, setShow] = useState(false);
    const [current, setCurrent] = useState(null);
    const domRef = useRef(null);

    const handleClick = useCallback((e, item) => {
        let ele = e.currentTarget;
        let rect = ele.getBoundingClientRect();
        ele.style.visibility = "hidden";
        setShow(true);
        setCurrent(item);
        setTimeout(() => {
            let cloneEle = document.querySelector("#modal .item");
            let translateX = getTranslateX(ele);
            domRef.current = cloneEle;
            cloneEle.style.cssText = `
            transform: translateX(${translateX}px);
            transition: transform 1s ease;
            top: ${rect.top}px;
            left: ${rect.left}px;
        `
        })

    }, [])

    const closeModal = useCallback(() => {
        setShow(false);
    }, [])

    return (
        <div>
            Fact Sheet
            <div className="container">
                <Swiper
                    spaceBetween={50}
                    slidesPerView={4}
                    onSlideChange={() => console.log('slide change')}
                    onSwiper={(swiper) => console.log(swiper)}
                >
                    {
                        items.map((item, index) => {
                            return (
                                <SwiperSlide id={item.name}>
                                    <Item item={item} handleClick={handleClick} />
                                </SwiperSlide>
                            )
                        })
                    }
                </Swiper>
            </div>
            <Modal show={show} closeModal={closeModal} item={current}>

            </Modal>
        </div>

    )
}


const Item = ({ item, handleClick, style }) => {
    const _handleClick = useCallback((e) => {
        handleClick(e, item);
    }, [])

    return (
        <div className="item" onClick={_handleClick} id={"item-" + item?.name}>
            <p>{item?.title}</p>
        </div>
    )
}

const Modal = ({ show, item, closeModal, children }) => {
    console.log(item)
    return (
        <CSSTransition
            in={show}
            timeout={1000}
            classNames='fade'
            unmountOnExit
            onEntered={el => { }}
            onEnter={el => {

            }}
            onEntering={el => {

            }}
            onEntered={el => {

            }}
            appear={true}
        >
            <div className="modal" id="modal">
                <Item item={item} handleClick={closeModal} />
                <div className="content"></div>
            </div>
        </CSSTransition>
    )
}

function getPosition(ele) {
    let rect = ele.getBoundingClientRect();
    console.log(rect);
}

function getCenterPosition(ele) {
    if (ele) {
        const rect = ele.getBoundingClientRect();
        return {
            x: rect.left + rect.width / 2,
            y: rect.top + rect.height / 2
        }
    }
}

function getTranslateX(ele) {
    let currentPosition = getCenterPosition(ele);
    let toPosition = getCenterPosition(document.body);
    return toPosition.x - currentPosition.x;
}


