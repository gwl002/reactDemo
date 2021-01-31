import { useState, useRef, useEffect } from "react";

export default function useResize(elementId, callback) {
    let MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver
    let observer = null;
    let recordOldValue = { width: 0, height: 0 };
    useEffect(() => {
        console.log("mounted");
        let element = document.getElementById(elementId);
        if (element) {
            observer = new MutationObserver((mutationList) => {
                for (let mutation of mutationList) {
                    console.log(mutation)
                }
                let width = getComputedStyle(element).getPropertyValue('width');
                let height = getComputedStyle(element).getPropertyValue('height');
                if (width === recordOldValue.width && height === recordOldValue.height) return;
                recordOldValue = {
                    width,
                    height
                }
                if (typeof callback === "function") {
                    callback(width, height);
                }
            })
            observer.observe(element, { attributes: true, attributeFilter: ['style'], attributeOldValue: true })
        }
        return () => {
            console.log("deleted");
            observer.disconnect()
            observer.takeRecords()
            observer = null
        }
    }, [])

    return [observer];
}


//沒用 不能檢測resize等