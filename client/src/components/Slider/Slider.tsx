import React, { useEffect, useRef, useState } from "react";

interface ImageData {
  src: string;
}

const data: ImageData[] = [
  {
    src: "https://images.unsplash.com/photo-1657299142014-34b66b73e68e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60",
  },
  {
    src: "https://images.unsplash.com/photo-1660130643232-a85efb07d60b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60",
  },
  {
    src: "https://images.unsplash.com/photo-1660092626872-bdc79892b910?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60",
  },
  {
    src: "https://images.unsplash.com/photo-1657299156147-13f929a63ce4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHw2fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60",
  },
  {
    src: "https://images.unsplash.com/photo-1660144767359-56a53fe44310?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60",
  },
  {
    src: "https://images.unsplash.com/photo-1660089766131-f86ef47f8681?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60",
  },
  {
    src: "https://images.unsplash.com/photo-1660092626225-f291ab2970b9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw4fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60",
  },
  {
    src: "https://images.unsplash.com/photo-1660137949858-087bf78d2801?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60",
  },
  {
    src: "https://images.unsplash.com/photo-1660130640626-5c01078c9e16?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw3fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60",
  },
  {
    src: "https://images.unsplash.com/photo-1660130640626-5c01078c9e16?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw3fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60",
  },
  {
    src: "https://images.unsplash.com/photo-1657299171054-e679f630a776?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxMXx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60",
  },
  {
    src: "https://images.unsplash.com/photo-1660148510028-5f8f354c4702?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMnx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60",
  },
];

const Slider: React.FC = () => {
  const [itemCount, setItemCount] = useState<number[]>([]);
  const progressItemRefs = useRef<HTMLDivElement[]>([]);
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    calculateProgressItem();
    window.addEventListener("resize", throttleProgressBar);

    return () => {
      window.removeEventListener("resize", throttleProgressBar);
    };
  }, []);

  const createRefs = (node: HTMLDivElement | null) => {
    if (node && progressItemRefs.current.length < itemCount.length) {
      progressItemRefs.current.push(node);
    }
    if (progressItemRefs.current?.length > 0) {
      progressItemRefs.current[0].className = "progress-item active";
    }
  };

  const onHandleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!sliderRef.current) return;

    let sliderIndex = parseInt(
      getComputedStyle(sliderRef.current).getPropertyValue("--slider-index")
    );

    if (e.currentTarget.closest(".left-handle")) {
      if (sliderIndex > 0) {
        sliderRef.current.style.setProperty(
          "--slider-index",
          (sliderIndex - 1).toString()
        );
        progressItemRefs.current[sliderIndex].className = "progress-item";
        progressItemRefs.current[sliderIndex - 1].className =
          "progress-item active";
      } else {
        progressItemRefs.current[sliderIndex].className = "progress-item";
        sliderRef.current.style.setProperty(
          "--slider-index",
          (itemCount.length - 1).toString()
        );
        progressItemRefs.current[itemCount.length - 1].className =
          "progress-item active";
      }
    }

    if (e.currentTarget.closest(".right-handle")) {
      if (sliderIndex + 1 < itemCount.length) {
        sliderRef.current.style.setProperty(
          "--slider-index",
          (sliderIndex + 1).toString()
        );
        progressItemRefs.current[sliderIndex].className = "progress-item";
        progressItemRefs.current[sliderIndex + 1].className =
          "progress-item active";
      } else {
        progressItemRefs.current[sliderIndex].className = "progress-item";
        sliderIndex = 0;
        sliderRef.current.style.setProperty(
          "--slider-index",
          sliderIndex.toString()
        );
        progressItemRefs.current[sliderIndex].className =
          "progress-item active";
      }
    }
  };

  const calculateProgressItem = () => {
    if (!sliderRef.current) return;

    const itemsPerScreen = parseInt(
      getComputedStyle(sliderRef.current).getPropertyValue("--items-per-screen")
    );
    const progressBarItemCount = Math.ceil(data.length / itemsPerScreen);
    const newItemCount = Array.from(
      { length: progressBarItemCount },
      (_, i) => i
    );
    setItemCount(newItemCount);
  };

  const throttleProgressBar = throttle(() => {
    calculateProgressItem();
  }, 250);

  function throttle(cb: (...args: unknown[]) => void, delay = 1000) {
    let shouldWait = false;
    let waitingArgs: unknown[] | null = null;

    const timeoutFunc = () => {
      if (waitingArgs == null) {
        shouldWait = false;
      } else {
        cb(...waitingArgs);
        waitingArgs = null;
        setTimeout(timeoutFunc, delay);
      }
    };

    return (...args: unknown[]) => {
      if (shouldWait) {
        waitingArgs = args;
        return;
      }

      cb(...args);
      shouldWait = true;
      setTimeout(timeoutFunc, delay);
    };
  }

  return (
    <div className={"row"}>
      <div className="header">
        <h3 className="title">Title</h3>
        <div className="progress-bar">
          {itemCount?.map((v, i) => (
            <div key={i} ref={createRefs} className="progress-item"></div>
          ))}
        </div>
      </div>
      <div className="container">
        <button onClick={onHandleClick} className="handle left-handle">
          <div className="text">&#8249;</div>
        </button>
        <div className="slider" ref={sliderRef}>
          {data.map((v, i) => (
            <img key={i} src={v.src} alt={`Slide ${i}`} />
          ))}
        </div>
        <button onClick={onHandleClick} className="handle right-handle">
          <div className="text">&#8250;</div>
        </button>
      </div>
    </div>
  );
};

export default Slider;
