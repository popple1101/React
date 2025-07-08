import React from 'react';

const ErrorMessage = ({ message, onRetry }) => {
  return (
    <div style={{
      padding: '16px',
      backgroundColor: '#f8d7da',
      border: '1px solid #f5c6cb',
      borderRadius: '4px',
      color: '#721c24',
      margin: '10px 0',
      textAlign: 'center'
    }}>
      <p style={{ margin: '0 0 10px 0' }}>
        ⚠️ {message}
      </p>
      {/* onRetry 함수는 부모 컴포넌트로부터 전달. 
          렌더링 시점 문제 등으로 null 상태일때는 오류 발생
          onRetry && 는 onRetry 함수가 있을 때만 button 표시하도록 함.
      */}
      {onRetry && (
        <button
          onClick={onRetry}
          style={{
            padding: '6px 12px',
            backgroundColor: '#dc3545',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          다시 시도
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;