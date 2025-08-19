"use client";
import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
const Page = () => {
  const [content, setContent] = useState("");

  const { ref, inView } = useInView({
    threshold: 0,
  });

  useEffect(() => {
    if (inView) {
      setContent(
        (prev) =>
          prev +
          `
      
       Namaste! Infinite scroll implement karna React mein kafi easy hai with
        the help of react-intersection-observer. Yeh library browser ke
        Intersection Observer API ko use karti hai. Isse aap smoothly aur
        efficiently elements ko track kar sakte hain jo viewport mein enter ya
        exit kar rahe hain. 🚀 karta hai, tab react-intersection-observer use
        detect karta hai. Jaise hi yeh detect hota hai, aap ek callback function
        trigger kar sakte hain jo next page ya data ka set fetch karta hai.
        Namaste! Infinite scroll implement karna React mein kafi easy hai with
      `
      );
    }
  }, [inView]);
  return (
    <div>
      <div className="px-16">
        Namaste! Infinite scroll implement karna React mein kafi easy hai with
        the help of react-intersection-observer. Yeh library browser ke
        Intersection Observer API ko use karti hai. Isse aap smoothly aur
        efficiently elements ko track kar sakte hain jo viewport mein enter ya
        exit kar rahe hain. 🚀 karta hai, tab react-intersection-observer use
        detect karta hai. Jaise hi yeh detect hota hai, aap ek callback function
        trigger kar sakte hain jo next page ya data ka set fetch karta hai.
        Namaste! Infinite scroll implement karna React mein kafi easy hai with
        the help of in jo next page ya data ka set fetch karta hai. Namaste!
        Infinite scroll implement karna React mein kafi easy hai with the help
        of react-intersection-observer. Yeh library browser ke Intersection
        Observer API ko use karti hai. Isse aap smoothly aur efficiently
        elements ko track kar sakte hain jo viewport mein enter ya exit kar rahe
        hain. 🚀 karta hai, tab react-intersection-observer use detect karta
        hai. Jaise hi yeh detect hota hai, aap ek callback function trigger kar
        sakte hain jo next page ya data ka set fetch karta hai. Namaste!
        Infinite scroll implement karna React mein kafi easy hai with the help
        of in jo next page ya data ka set fetch karta hai. Namaste! Infinite
        scroll implement karna React mein kafi easy hai with the help of
        react-intersection-observer. Yeh library browser ke Intersection
        Observer API ko use karti hai. Isse aap smoothly aur efficiently
        elements ko track kar sakte hain jo viewport mein enter ya exit kar rahe
        hain. 🚀 karta hai, tab react-intersection-observer use detect karta
        hai. Jaise hi yeh detect hota hai, aap ek callback function trigger kar
        sakte hain jo next page ya data ka set fetch karta hai. Namaste!
        Infinite scroll implement karna React mein kafi easy hai with the help
        of in jo next page ya data ka set fetch karta hai.
        {content}
      </div>

      <div ref={ref}></div>
    </div>
  );
};

export default Page;
