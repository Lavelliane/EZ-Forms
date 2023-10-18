import { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { IoAddCircleOutline, IoRemoveCircleOutline, IoCheckmarkCircleOutline } from 'react-icons/io5';
import { PiNotePencilLight } from 'react-icons/pi';
import { IProgramFlow } from '@/types';

interface Activity {
	activityName: string;
	timeSlot: string;
	isEditing: boolean;
	originalActivity: string;
	originalTimeSlot: string;
}

interface FlowTableProps {
	onChange: (e: any) => void;
	form: IProgramFlow;
}

export function FlowTable({ onChange, form }: FlowTableProps) {
	const [activity, setActivity] = useState<Activity[]>([]);
	const [newActivity, setNewActivity] = useState('');
	const [newTimeSlot, setNewTimeSlot] = useState('');
  
	useEffect(() => {
	  if (form.programFlow) {
		const activities = form.programFlow
		  .filter((item: { activityName: string; timeSlot: string }) => item.activityName && item.timeSlot)
		  .map((item: { activityName: string; timeSlot: string }) => ({
			activityName: item.activityName,
			timeSlot: item.timeSlot,
			isEditing: false,
			originalActivity: item.activityName,
			originalTimeSlot: item.timeSlot,
		  }));
		setActivity(activities);
	  }
	}, [form.programFlow]);
  
	const addActivity = () => {
	  if (newActivity && newTimeSlot) {
		const newEntry: Activity = {
		  activityName: newActivity,
		  timeSlot: newTimeSlot,
		  isEditing: false,
		  originalActivity: newActivity,
		  originalTimeSlot: newTimeSlot,
		};
		setActivity([...activity, newEntry]);
		onChange({ target: { id: 'programFlow', value: [...activity, newEntry] } });
		setNewActivity('');
		setNewTimeSlot('');
	  }
	};
  
	const removeActivity = (index: number) => {
	  const updatedActivity = [...activity];
	  updatedActivity.splice(index, 1);
	  setActivity(updatedActivity);
	  onChange({ target: { id: 'programFlow', value: updatedActivity } });
	};
  
	const toggleEdit = (index: number) => {
	  const updatedActivity = [...activity];
	  updatedActivity[index].isEditing = !updatedActivity[index].isEditing;
	  setActivity(updatedActivity);
	};
  
	const handleEdit = (index: number) => {
	  const updatedActivity = [...activity];
	  const newEditedActivity = newActivity || updatedActivity[index].originalActivity;
	  const newEditedTimeSlot = newTimeSlot || updatedActivity[index].originalTimeSlot;
	  updatedActivity[index].activityName = newEditedActivity;
	  updatedActivity[index].timeSlot = newEditedTimeSlot;
	  updatedActivity[index].isEditing = false;
	  updatedActivity[index].originalActivity = newEditedActivity;
	  updatedActivity[index].originalTimeSlot = newEditedTimeSlot;
	  setActivity(updatedActivity);
	  setNewActivity('');
	  setNewTimeSlot('');
	  onChange({ target: { id: 'programFlow', value: updatedActivity } });
	};
	
	//console.log(activity);

	return (
		<div>
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>Activity Name</TableHead>
						<TableHead>Time Slot</TableHead>
						<TableHead className='justify-end flex items-center'>Actions</TableHead>
					</TableRow>
				</TableHeader>

				<TableBody>
					{activity.map((ac, index) => (
						<TableRow key={`${ac.activityName}-${ac.timeSlot}`}>
							<TableCell className='font-medium'>
								{ac.isEditing ? (
									<Input
										type='text'
										value={newActivity || ac.originalActivity}
										onChange={(e) => setNewActivity(e.target.value)}
										placeholder={ac.originalActivity}
									/>
								) : (
									ac.activityName
								)}
							</TableCell>
							<TableCell>
								{ac.isEditing ? (
									<Input
										type='text'
										value={newTimeSlot || ac.originalTimeSlot}
										onChange={(e) => setNewTimeSlot(e.target.value)}
										placeholder={ac.originalTimeSlot}
									/>
								) : (
									ac.timeSlot
								)}
							</TableCell>
							<TableCell className='justify-end flex items-center'>
								{ac.isEditing ? (
									<div className='flex gap-2'>
										<Button
											onClick={() => handleEdit(index)}
											className='p-0 m-0 bg-transparent text-green-700 hover:text-green-600 text-xl hover:bg-transparent'
										>
											<IoCheckmarkCircleOutline />
										</Button>
										<Button
											onClick={() => removeActivity(index)}
											className='p-0 m-0 bg-transparent text-red-600 hover:text-red-400 text-xl hover:bg-transparent'
										>
											<IoRemoveCircleOutline />
										</Button>
									</div>
								) : (
									<div>
										<Button
											onClick={() => toggleEdit(index)}
											className='p-4 m-0 bg-transparent text-blue-600 hover:text-blue-400 text-xl hover:bg-transparent'
										>
											<PiNotePencilLight />
										</Button>
									</div>
								)}
							</TableCell>
						</TableRow>
					))}
					<TableRow>
						<TableCell>
							<Input
								type='text'
								value={activity.some((ac) => ac.isEditing) ? '' : newActivity}
								onChange={(e) => setNewActivity(e.target.value)}
								placeholder='Activity Name'
								disabled={activity.some((ac) => ac.isEditing)}
							/>
						</TableCell>
						<TableCell>
							<Input
								type='text'
								value={activity.some((ac) => ac.isEditing) ? '' : newTimeSlot}
								onChange={(e) => setNewTimeSlot(e.target.value)}
								placeholder='Time Slot'
								disabled={activity.some((ac) => ac.isEditing)}
							/>
						</TableCell>
						<TableCell className='justify-end flex items-center'>
							<Button
								onClick={addActivity}
								className='p-4 m-0 bg-transparent text-purple-600 hover:text-purple-400 text-xl hover:bg-transparent'
								disabled={activity.some((ac) => ac.isEditing)}
							>
								<IoAddCircleOutline />
							</Button>
						</TableCell>
					</TableRow>
				</TableBody>
			</Table>
		</div>
	);
}
