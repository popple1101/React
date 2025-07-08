import React from "react";

const LoadingSpinner = ({ message = "로딩 중..." }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
        fontSize: "16px",
        color: "#666",
      }}
    >
      <div
        style={{
          border: "3px solid #f3f3f3",
          borderTop: "3px solid #007bff",
          borderRadius: "50%",
          width: "20px",
          height: "20px",
          animation: "spin 1s linear infinite",
          // animation: <keyframes 이름> <지속시간> <timing-function속도함수> <반복횟수>
          marginRight: "10px",
        }}
      ></div>
      {message}
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default LoadingSpinner;
