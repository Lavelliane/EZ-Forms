import Image from 'next/image';
import HeaderCheckbox from '../../public/assets/Header-Checkbox.png'

export default function Header() {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className='flex w-[1000px] items-center justify-between relative'>
        <img
          src="https://upload.wikimedia.org/wikipedia/en/3/39/University_of_San_Carlos_logo.png"
          alt="USC Logo"
          className="w-[100px] left-[45%] absolute"
        />
        <div className='flex-grow'></div>
        <Image src={HeaderCheckbox} alt={'Header checkbox'} className='w-[200px]'/>
      </div>
      <div className="flex flex-col items-center">
        <p>University of San Carlos</p>
        <p>Cebu City</p>
      </div>
      <div className="flex flex-col items-center">
        <p className="font-bold">STUDENT ACTIVITIES SECTION</p>
        <p>Office of Student Formation and Activities</p>
      </div>
      <div className="flex flex-col items-center">
        <p className="font-bold">ACTIVITY FORM 1</p>
        <p>(General Activity Form for Student Organizations)</p>
      </div>
    </div>
  );
}
