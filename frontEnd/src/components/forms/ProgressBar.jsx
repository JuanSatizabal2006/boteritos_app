import {
    ProgressBar,
} from '@tremor/react';
import { useRegFormContext } from '../../hooks/RegFormProvider';

export const ProgressBarD = () => {
    const [state] = useRegFormContext();
    return(
        <div className="flex justify-center">
            <ProgressBar className='font-cocogooseLight text-paragraph' value={state.percent} showAnimation={true} color={'darkBlue'} label={`${state.percent}%`} />
        </div>
    )
};