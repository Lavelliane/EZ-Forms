import { useEffect, useState } from 'react';
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
	const [selectedTab, setSelectedTab] = useState('')
	const [isCheckedAttendance, setIsCheckedAttendance] = useState(false);
	const [isCheckedDemos, setIsCheckedDemos] = useState(false);
	const [isCheckedGames, setIsCheckedGames] = useState(false);
	const [isCheckedGroupActivities, setIsCheckedGroupActivities] = useState(false);
	const [isCheckedGuestSpeaker, setIsCheckedGuestSpeaker] = useState(false);
	const [isCheckedHandsOn, setIsCheckedHandsOn] = useState(false);
	const [isCheckedQaSession, setIsCheckedQaSession] = useState(false);
	const [isCheckedQuizzes, setIsCheckedQuizzes] = useState(false);


	const handleTabChange: (selectedTab: string) => void = (selectedTab: string) => {
		onChange({ target: { id: 'modeOfPresentation', value: selectedTab } });
		setSelectedTab(selectedTab)
	};

	const onCheckedActivity = (e: any) => {
		if (e.target.id === 'attendance') {
			setIsCheckedAttendance(!isCheckedAttendance);
		} else if (e.target.id === 'demos') {
			setIsCheckedDemos(!isCheckedDemos);
		} else if (e.target.id === 'games') {
			setIsCheckedGames(!isCheckedGames);
		} else if (e.target.id === 'groupActivities') {
			setIsCheckedGroupActivities(!isCheckedGroupActivities);
		} else if (e.target.id === 'guestSpeaker') {
			setIsCheckedGuestSpeaker(!isCheckedGuestSpeaker);
		} else if (e.target.id === 'handsOn') {
			setIsCheckedHandsOn(!isCheckedHandsOn);
		} else if (e.target.id === 'qaSession') {
			setIsCheckedQaSession(!isCheckedQaSession);
		} else if (e.target.id === 'quizzes') {
			setIsCheckedQuizzes(!isCheckedQuizzes);
		}
	};

	useEffect(() => {
		const activitySettings = [
		isCheckedAttendance && 'Attendance',
		selectedTab === 'online' ? 
			[
			isCheckedDemos && 'Demonstrations',
			isCheckedGroupActivities && 'Group Activities',
			isCheckedGuestSpeaker && 'Guests or Guest Speakers',
			isCheckedQaSession && 'Q&A Sessions',
			isCheckedQuizzes && 'Quizzes',
			].filter(Boolean).join(', ')
			:
			[
			isCheckedDemos && 'Demonstrations',
			isCheckedGames && 'Games',
			isCheckedGroupActivities && 'Group Activities',
			isCheckedGuestSpeaker && 'Guests or Guest Speakers',
			isCheckedHandsOn && 'Hands-On Activities',
			isCheckedQaSession && 'Q&A Sessions',
			isCheckedQuizzes && 'Quizzes',
			].filter(Boolean).join(', ')
		]
		.filter(Boolean)
		.join(', ');
	
		onChange({ target: { id: 'activitySettings', value: activitySettings } });
	}, [isCheckedAttendance, 
		isCheckedDemos, 
		isCheckedGames,
		isCheckedGroupActivities,
		isCheckedGuestSpeaker,
		isCheckedHandsOn, 
		isCheckedQaSession,
		isCheckedQuizzes,
		selectedTab // Make sure to include selectedTab in the dependency array
	]);

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
						<div className='flex flex-row w-full justify-around'>
							<div className='flex flex-col gap-3 justify-items-start w-1/2'>
								<span className='flex items-center gap-2'>
									<Switch 
										id='demos' 
										checked={isCheckedDemos}
										onCheckedChange={(e) => {
											onCheckedActivity({ target: { id: 'demos', value: isCheckedDemos } });
										}}
									/>
									<Label htmlFor='demos'>Demos</Label>
								</span>
								<span className='flex items-center gap-2'>
									<Switch 
										id='handsOn' 
										checked={isCheckedHandsOn}
										onCheckedChange={(e) => {
											onCheckedActivity({ target: { id: 'handsOn', value: isCheckedHandsOn } });
										}}
									/>
									<Label htmlFor='handsOn'>Hands-On</Label>
								</span>
								<span className='flex items-center gap-2'>
									<Switch 
										id='qaSession' 
										checked={isCheckedQaSession}
										onCheckedChange={(e) => {
											onCheckedActivity({ target: { id: 'qaSession', value: isCheckedQaSession } });
										}}
									/>
									<Label htmlFor='qaSession'>Q&A Session</Label>
								</span>
								<span className='flex items-center gap-2'>
									<Switch 
										id='groupActivities' 
										checked={isCheckedGroupActivities}
										onCheckedChange={(e) => {
											onCheckedActivity({ target: { id: 'groupActivities', value: isCheckedGroupActivities } });
										}}
									/>
									<Label htmlFor='groupActivities'>Group Activities</Label>
								</span>
							</div>
							<div>
								<Separator orientation='vertical' className='bg-slate-300' />
							</div>
							<div className='flex flex-col gap-3 justify-items-start w-1/2 pl-5'>
								<span className='flex items-center gap-2'>
									<Switch 
										id='games' 
										checked={isCheckedGames}
										onCheckedChange={(e) => {
											onCheckedActivity({ target: { id: 'games', value: isCheckedGames } });
										}}
									/>
									<Label htmlFor='games'>Games</Label>
								</span>
								<span className='flex items-center gap-2'>
									<Switch 
										id='quizzes' 
										checked={isCheckedQuizzes}
										onCheckedChange={(e) => {
											onCheckedActivity({ target: { id: 'quizzes', value: isCheckedQuizzes } });
										}}
									/>
									<Label htmlFor='quizzes'>Quizzes</Label>
								</span>
								<span className='flex items-center gap-2'>
									<Switch 
										id='guestSpeaker' 
										checked={isCheckedGuestSpeaker}
										onCheckedChange={(e) => {
											onCheckedActivity({ target: { id: 'guestSpeaker', value: isCheckedGuestSpeaker } });
										}}
									/>
									<Label htmlFor='guestSpeaker'>Guest Speakers</Label>
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
									<Switch 
										id='demos' 
										checked={isCheckedDemos}
										onCheckedChange={(e) => {
											onCheckedActivity({ target: { id: 'demos', value: isCheckedDemos } });
										}}
									/>
									<Label htmlFor='demos'>Demos</Label>
								</span>
								<span className='flex items-center gap-2'>
									<Switch 
										id='qaSession' 
										checked={isCheckedQaSession}
										onCheckedChange={(e) => {
											onCheckedActivity({ target: { id: 'qaSession', value: isCheckedQaSession } });
										}}
									/>
									<Label htmlFor='qaSession'>Q&A Session</Label>
								</span>
								<span className='flex items-center gap-2'>
									<Switch 
										id='demos' 
										checked={isCheckedGroupActivities}
										onCheckedChange={(e) => {
											onCheckedActivity({ target: { id: 'groupActivities', value: isCheckedGroupActivities } });
										}}
									/>
									<Label htmlFor='groupActivities'>Group Activities</Label>
								</span>
							</div>
							<div>
								<Separator orientation='vertical' className='bg-slate-300' />
							</div>
							<div className='flex flex-col gap-3 justify-items-start w-1/2 pl-5'>
								<span className='flex items-center gap-2'>
									<Switch 
										id='quizzes' 
										checked={isCheckedQuizzes}
										onCheckedChange={(e) => {
											onCheckedActivity({ target: { id: 'quizzes', value: isCheckedQuizzes } });
										}}
									/>
									<Label htmlFor='quizzes'>Quizzes</Label>
								</span>
								<span className='flex items-center gap-2'>
									<Switch 
										id='guestSpeaker' 
										checked={isCheckedGuestSpeaker}
										onCheckedChange={(e) => {
											onCheckedActivity({ target: { id: 'guestSpeaker', value: isCheckedGuestSpeaker } });
										}}
									/>
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
function setForm(arg0: any) {
	throw new Error('Function not implemented.');
}

