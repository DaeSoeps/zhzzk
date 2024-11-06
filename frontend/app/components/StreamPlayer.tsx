const StreamPlayer = () => {
    return (
      <div className="w-full h-full max-w-4xl bg-black flex justify-center items-center">
        <video
          controls
          className="w-full h-full rounded-lg"
          src="https://www.w3schools.com/html/mov_bbb.mp4"  // 예제 비디오 URL입니다. 실제 스트리밍 URL로 교체하세요.
        >
          Your browser does not support the video tag.
        </video>
      </div>
    );
  };
  
  export default StreamPlayer;