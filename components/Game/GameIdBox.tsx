import React from "react";

interface IProps {
  id: string;
  styles: CSSModule;
}

const GameIdBox = ({ id, styles }: IProps) => {
  const copyText = () => {
    const range = document.createRange();
    range.selectNode(document.getElementById("gameId"));
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
    document.execCommand("copy");
    window.getSelection().removeAllRanges();
    const tooltip = document.getElementById("myTooltip");
    tooltip.innerHTML = "Copied!";
  };

  const outFunc = () => {
    const tooltip = document.getElementById("myTooltip");
    tooltip.innerHTML = "Copy";
  };

  return (
    <div className={styles.shareId}>
      <p>複製以下邀請碼，傳送給朋友</p>
      <div className={styles.gameId}>
        <p id="gameId">{id}</p>
        <div className={styles.tooltip}>
          <img
            src="/img/copy.svg"
            alt="copy"
            onClick={copyText}
            onMouseOut={outFunc}
          />
          <span id="myTooltip">Copy</span>
        </div>
      </div>{" "}
    </div>
  );
};

export default GameIdBox;
