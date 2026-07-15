export default function LoadingSpinnerAdmin() { 

  return (

    <div className="flex items-center justify-center min-h-screen bg-white dark:bg-black">

      

      <div className="relative flex flex-col items-center">



        <div className="w-16 h-16 border-4 border-transparent border-t-indigo-600 border-r-indigo-600 rounded-full animate-spin"></div>



        <div className="mt-6 text-center">

          <h2 className="text-xl font-bold text-black dark:text-white">

            Syncing Data

          </h2>



          <p className="text-slate-400 text-sm mt-1">

            Optimizing Workspace

          </p>

        </div>



      </div>

    </div>

  );

}