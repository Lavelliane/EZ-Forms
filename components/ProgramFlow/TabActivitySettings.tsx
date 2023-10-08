import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

export function TabActivitySettings() {
  return (
    <Tabs defaultValue="face-to-face" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="face-to-face">Face-to-Face</TabsTrigger>
        <TabsTrigger value="online">Online</TabsTrigger>
      </TabsList>
      <TabsContent value="face-to-face">
        <Card className="bg-purple-100">
          <CardHeader>
            <CardTitle>Face-to-Face</CardTitle>
            <CardDescription>
                Recommended for events that require direct interaction and effective communication.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 ">
            <div className="flex flex-row w-full justify-around">            
                <div className="flex flex-col gap-3 justify-items-start w-1/2 pr-5">
                    <span className="flex items-center gap-2"><Switch /><Label htmlFor="name">Demos</Label></span>
                    <span className="flex items-center gap-2"><Switch /><Label htmlFor="name">Hands-On</Label></span>
                    <span className="flex items-center gap-2"><Switch /><Label htmlFor="name">Q&A Session</Label></span>
                    <span className="flex items-center gap-2"><Switch /><Label htmlFor="name">Attendance</Label></span>
                </div>
                <div>
                    <Separator orientation='vertical' className="bg-slate-400" />
                </div>
                <div className="flex flex-col gap-3 justify-items-start w-1/2 pl-5">
                    <span className="flex items-center gap-2"><Switch /><Label htmlFor="name">Games</Label></span>
                    <span className="flex items-center gap-2"><Switch /><Label htmlFor="name">Quizzes</Label></span>
                    <span className="flex items-center gap-2"><Switch /><Label htmlFor="name">Guest Speakers</Label></span>
                    <span className="flex items-center gap-2"><Switch /><Label htmlFor="name">Group Activities</Label></span>
                </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="online">
        <Card className="bg-purple-100">
          <CardHeader>
            <CardTitle>Online</CardTitle>
            <CardDescription>
                Offers the convenience of attending from anywhere. Great for tech-oriented events.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex flex-row w-full justify-around">            
                <div className="flex flex-col gap-3 justify-items-start w-1/2 pr-5">
                    <span className="flex items-center gap-2"><Switch /><Label htmlFor="name">Demos</Label></span>
                    <span className="flex items-center gap-2"><Switch /><Label htmlFor="name">Q&A Session</Label></span>
                    <span className="flex items-center gap-2"><Switch /><Label htmlFor="name">Group Activities</Label></span>
                </div>
                <div>
                    <Separator orientation='vertical' className="bg-slate-400"/>
                </div>
                <div className="flex flex-col gap-3 justify-items-start w-1/2 pl-5">
                    <span className="flex items-center gap-2"><Switch /><Label htmlFor="name">Quizzes</Label></span>
                    <span className="flex items-center gap-2"><Switch /><Label htmlFor="name">Guest Speakers</Label></span>
                </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
export default TabActivitySettings