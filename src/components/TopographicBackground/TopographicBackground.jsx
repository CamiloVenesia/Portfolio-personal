
import React, { useEffect, useState } from "react";
import { Topolines } from "topolines/react";
import styles from "./TopographicBackground.module.css";

const TopographicBackground = () => {
  const [isLight, setIsLight] = useState(
    () =>
      typeof document !== "undefined" &&
      document.body.classList.contains("light")
  );

  useEffect(() => {
    const updateTheme = () => {
      setIsLight(
        document.body.classList.contains("light")
      );
    };

    updateTheme();

    const observer = new MutationObserver(updateTheme);

    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["class"]
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={styles.layer}
      aria-hidden="true"
    >
      <Topolines
        className={styles.background}
        seed="camilo-portfolio-topographic"

        color={isLight ? "#648BA2" : "#078DB8"}

        speed={0.0022}
        scale={1.6}
        levels={7}
        lineWidth={0.8}

        opacity={isLight ? 0.15 : 0.065}

        drift={[0.001, 0.00055]}
        warp={0.08}

        maxDpr={1.2}
        interactive={false}
      />
    </div>
  );
};

export default TopographicBackground;
