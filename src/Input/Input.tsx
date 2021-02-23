interface InputProps {
  name: string;
  type: string;
  value: string;
  label: string;
  customClassName?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
const Input = (props: InputProps) => {
  const { name, type, value, label, onChange, customClassName } = props;
  return (
    <div className="input-container">
      <label className="label">{label}</label>
      <input type={type} name={name} value={value} onChange={onChange}
        className={`input-text ${customClassName}`}
      />
    </div>
  )
}

export default Input;