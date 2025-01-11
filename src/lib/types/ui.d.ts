declare interface InputFieldProps {
    type: string;
    id?: string;
    name?: string;
    value?: string;
    label?: string;
    checked?: boolean;
    placeholder?: string;
    customStyles?: string;
    handleChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleBlur?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

declare interface SubmitButtonProps {
    title : string;
    isLoading?: boolean; 
    handleClick?: (() => void) | ((event: React.MouseEvent<HTMLButtonElement>) => void);
  }

declare interface CustomButtonType {
    title: string, 
    value?: string
    additionalStyles?: string, 
    handleClick?: () => void, 
    disabled?: boolean
  }