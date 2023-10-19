import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ta } from 'date-fns/locale';

interface TabActivitySettingsProps {
	onChange: (event: any) => void;
}

export function TabActivitySettings({ onChange }: TabActivitySettingsProps) {
	const [tabIncludes, setTabIncludes] = useState<string[]>([]);

	const handleTabChange: (selectedTab: string) => void = (selectedTab: string) => {
		onChange({ target: { id: 'modeOfPresentation', value: selectedTab } });
	};

	const onCheckedChange = (event: any) => {
		const { id, checked } = event.target.id;
		if (checked) {
			setTabIncludes([...tabIncludes, id]);
		} else {
			setTabIncludes(tabIncludes.filter((item) => item !== id));
		}
	};
	console.log(tabIncludes);
	return (
		<Tabs defaultValue='face-to-face' className='md:w-[400px] w-full' onValueChange={handleTabChange}>
			<TabsList className='grid w-full grid-cols-2'>
				<TabsTrigger value='face-to-face'>Face-to-Face</TabsTrigger>
				<TabsTrigger value='online'>Online</TabsTrigger>
			</TabsList>
			<TabsContent value='face-to-face'>
				<Card className='bg-purple-100'>
					<CardHeader>
						<CardTitle>Face-to-Face</CardTitle>
						<CardDescription>
							Recommended for events that require direct interaction and effective communication.
						</CardDescription>
					</CardHeader>
					<CardContent className='space-y-2 '>
						<div className='flex flex-row w-full justify-between items-center h-32'>
							<div className='flex flex-col gap-3 justify-items-start w-1/2'>
								<span className='flex items-center gap-2'>
									<Switch id='demos' onCheckedChange={onCheckedChange} />
									<Label htmlFor='demos'>Demos</Label>
								</span>
								<span className='flex items-center gap-2'>
									<Switch id='handsOn' onCheckedChange={onCheckedChange} />
									<Label htmlFor='handsOn'>Hands-On</Label>
								</span>
								<span className='flex items-center gap-2'>
									<Switch id='qaSession' onCheckedChange={onCheckedChange} />
									<Label htmlFor='qaSession'>Q&A Session</Label>
								</span>
								<span className='flex items-center gap-2'>
									<Switch id='attendance' onCheckedChange={onCheckedChange} />
									<Label htmlFor='attendance'>Attendance</Label>
								</span>
							</div>
							<Separator orientation='vertical' className='mx-2 bg-gray-500' />
							<div className='flex flex-col gap-3 justify-items-start w-1/2'>
								<span className='flex items-center gap-2'>
									<Switch id='games' onCheckedChange={onCheckedChange} />
									<Label htmlFor='games'>Games</Label>
								</span>
								<span className='flex items-center gap-2'>
									<Switch id='quizzes' onCheckedChange={onCheckedChange} />
									<Label htmlFor='quizzes'>Quizzes</Label>
								</span>
								<span className='flex items-center gap-2'>
									<Switch id='guestSpeaker' onCheckedChange={onCheckedChange} />
									<Label htmlFor='guestSpeaker'>Guest Speakers</Label>
								</span>
								<span className='flex items-center gap-2'>
									<Switch id='groupActivities' onCheckedChange={onCheckedChange} />
									<Label htmlFor='groupActivities'>Group Activities</Label>
								</span>
							</div>
						</div>
					</CardContent>
				</Card>
			</TabsContent>
			<TabsContent value='online'>
				<Card className='bg-purple-100'>
					<CardHeader>
						<CardTitle>Online</CardTitle>
						<CardDescription>
							Offers the convenience of attending from anywhere. Great for tech-oriented events.
						</CardDescription>
					</CardHeader>
					<CardContent className='space-y-2'>
						<div className='flex flex-row w-full justify-around'>
							<div className='flex flex-col gap-3 justify-items-start w-1/2 pr-5'>
								<span className='flex items-center gap-2'>
									<Switch id='demos' onCheckedChange={onCheckedChange} />
									<Label htmlFor='demos'>Demos</Label>
								</span>
								<span className='flex items-center gap-2'>
									<Switch id='qaSession' onCheckedChange={onCheckedChange} />
									<Label htmlFor='qaSession'>Q&A Session</Label>
								</span>
								<span className='flex items-center gap-2'>
									<Switch id='groupActivities' onCheckedChange={onCheckedChange} />
									<Label htmlFor='groupActivities'>Group Activities</Label>
								</span>
							</div>
							<div>
								<Separator orientation='vertical' className='bg-slate-300' />
							</div>
							<div className='flex flex-col gap-3 justify-items-start w-1/2 pl-5'>
								<span className='flex items-center gap-2'>
									<Switch id='quizzes' onCheckedChange={onCheckedChange} />
									<Label htmlFor='quizzes'>Quizzes</Label>
								</span>
								<span className='flex items-center gap-2'>
									<Switch id='guestSpeaker' onCheckedChange={onCheckedChange} />
									<Label htmlFor='guestSpeaker'>Guest Speakers</Label>
								</span>
							</div>
						</div>
					</CardContent>
				</Card>
			</TabsContent>
		</Tabs>
	);
}
export default TabActivitySettings;
