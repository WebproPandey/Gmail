import React from "react";

const Sidebar = ({mailtoogelButton}) => {
  const sidebardata = [
    {
      name: "Inbox",
      icon: "ri-image-fill",
    },
    {
      name: "Starred",
      icon: "ri-star-line",
    },
    {
      name: "Send",
      icon: "ri-send-plane-2-line",
    },
    {
      name: "Draft",
      icon: "ri-file-3-line",
    },
    {
      name: "Bin",
      icon: "ri-delete-bin-4-line",
    },
    {
      name: "All mail",
      icon: "ri-mail-line",
    },
  ];

  return (
    <div className="w-[20%] h-full bg-[#f5f5f5] ">
      <div className="p-[2vw]">
        <button onClick={mailtoogelButton} className="py-[.7rem] text-[1vw] font-medium flex  justify-center items-center  bg-[#EAF1FB] w-full rounded-full ">
          <i className="ri-pencil-line text-[2vw] text-black/50"></i>
          Compose Message
        </button>
      </div>
      <div className="flex flex-col ">
        {sidebardata.map((data, index) => {
          return (
            <>
              <div key={index} className="pr-[1vw] group">
                <button key={index} className="py-[0.4vw] text-[1.1vw] font-medium flex justify-start gap-5 items-center group-hover:bg-white  group-hover:border-r-2 group-hover:border-cyan-400  group-hover:text-cyan-400  w-full pl-[3vw] transition-all duration-300 ease-in-out">
                  <i className={`${data.icon} text-[1.6vw] `}></i>
                  {data.name}
                </button>
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
