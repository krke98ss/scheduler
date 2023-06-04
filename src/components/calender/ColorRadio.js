import { bgColor } from '../../common/common';

const ColorRadio =({setColor, color, tagColor, }) => {
  
  const onChangeHandler = (e) => {
    setColor(e.target.value)
  }

  return(
  <input
    type='radio'
    onChange={onChangeHandler}
    checked ={color === tagColor}
    name='color'
    value={tagColor}
    className={`${bgColor[tagColor]} p-2 opacity-30 checked:opacity-100  hover:opacity-100`}
  />
  )

}

export default ColorRadio;