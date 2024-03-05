// import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const EmailVerify = (props) => {
  return (
    <>
      <div className="min-h-screen w-full flex justify-center items-center">
        (
        <div className="min-h-screen w-full bg-[#77d177] text-white flex flex-col justify-center items-center">
          {/* <img src={success} alt="success_img" className={styles.success_img} /> */}
          {/* <CheckCircleIcon style={{ fontSize: "48px" }} /> */}
          <p className="text-[50px]">SUCCESS</p>
          <h1 className="text-3xl font-semibold my-5 ">
            Email verified successfully
          </h1>
          <p className="my-5 bg-blue-950 px-6 py-3">
            Your unique user id is{" "}
            <span className="text-[crimson]">{props.uniqueId}</span>
          </p>
        </div>
        )
      </div>
    </>
  );
};

export default EmailVerify;
