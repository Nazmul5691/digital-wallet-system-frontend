
// import { Separator } from "@/components/ui/separator"
// import {
//     SidebarInset,
//     SidebarProvider,
//     SidebarTrigger,
// } from "@/components/ui/sidebar"
// import { Outlet } from "react-router"
// import { AppSidebar } from "../ui/app-sidebar"
// import UserGuidedTour from "./UserGuidedTour"
// import AgentGuidedTour from "./AgentGuidedTour"


// export default function DashboardLayout() {
//     return (
//         <SidebarProvider>
//             <AppSidebar className="sidebar-nav" />
//             <SidebarInset>
//                 <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
//                     <SidebarTrigger className="-ml-1" />
//                     <Separator
//                         orientation="vertical"
//                         className="mr-2 data-[orientation=vertical]:h-4"
//                     />
//                     <UserGuidedTour />
//                     <AgentGuidedTour />
//                 </header>
//                 <div className="flex flex-1 flex-col gap-4 p-4">
//                     <Outlet />
//                 </div>
//             </SidebarInset>
//         </SidebarProvider>
//     )
// }




import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Outlet } from "react-router";
import { AppSidebar } from "../ui/app-sidebar";
import UserGuidedTour from "./UserGuidedTour";
import AgentGuidedTour from "./AgentGuidedTour";
import { useUserInfoQuery } from "@/redux/features/user/user.api";

export default function DashboardLayout() {
  const { data: userData } = useUserInfoQuery(undefined);
  const role = userData?.data?.role;

  return (
    <SidebarProvider>
      <AppSidebar className="sidebar-nav" />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
          {/* Show guided tour based on role */}
          {role === "USER" && <UserGuidedTour />}
          {role === "AGENT" && <AgentGuidedTour />}
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

