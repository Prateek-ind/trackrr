
import { LuLoaderCircle } from 'react-icons/lu'

const Loading = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center gap-4 text-2xl">
        <LuLoaderCircle size={32} className="animate-spin" /> <p>Loading...</p>
      </div>
  )
}

export default Loading