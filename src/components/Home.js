const Home = (props) => {
    console.log("Home : ",props.user.token);
    return(
      <>
      { props.user.token? (
        <section className="bg-gray-900">
              <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                  <div className="w-full rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 bg-gray-800 border-gray-700 text-center">
                      <div className="p-4 space-y-4 md:space-y-6 sm:p-4">
              <h1 className="text-xl font-bold leading-tight text-center tracking-tight md:text-2xl text-green-400">Welcome {props.user.userData.username}
              </h1>
              </div></div></div>
            </section>
        ) : (
            <section className="bg-gray-900">
              <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                  <div className="w-full rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 bg-gray-800 border-gray-700 text-center">
                      <div className="p-4 space-y-4 md:space-y-6 sm:p-4">
              <h1 className="text-xl font-bold leading-tight text-center tracking-tight md:text-2xl text-red-600">Please Login First !
              </h1>
              </div></div></div>
            </section>
          )}
      </>
    );
  }
  export default Home;