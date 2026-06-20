import './styles.scss';
import camera from '../../assets/icons/camera.svg';
import { useRef, useState } from 'react';

interface AvatarInput {
	onChange: (value: File) => void;
	value: File | string | null;
	name?: string;
	size?: number;
}

export const AvatarInput = ({ onChange, value = null, name = '', size = 112 }: AvatarInput) => {
	const inputRef = useRef<HTMLInputElement | null>(null);
	const [preview, setPreview] = useState<string | null>(value ? (typeof value !== 'string' ? URL.createObjectURL(value) : value) : null);

	const handlePreviewChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;
		setPreview(URL.createObjectURL(file));
		onChange?.(file);
	};

	return (
		<div onClick={() => inputRef.current?.click()} className="avatar-input" style={{ width: size, height: size }}>
			{preview ? (
				<img src={preview} alt="avatar" />
			) : name ? (
				<h1>{name[0].toUpperCase()}</h1>
			) : (
				<img style={{ width: size / 3, height: size / 3 }} src={camera} alt="camera" />
			)}
			<input ref={inputRef} type="file" accept="image/*" onChange={handlePreviewChange} />
		</div>
	);
};
