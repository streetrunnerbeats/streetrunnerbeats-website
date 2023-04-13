import * as React from 'react';

import ReactDOM from 'react-dom/client';
import { Input } from 'antd';

import Style from './photoInput.module.scss';

interface PhotoInputInterface {
	showInput?: boolean;
	setterCallback: Function;
	name: string;
	onChange: Function;
}

/**
 * ---------------------------
 * -->> General Use Summary
 * ---------------------------
 * - REQUIRED: separate useForm hook includes 'onChange' and 'setValue' functions that will be needed.
 *
 * - PhotoInput component will take useForm onChange, default is hidden to be used with included PhotoInput.PhotoPreview component.
 *
 * - If not using preview, set 'showInput' prop to true.
 *
 * - If using preview:
 * 		- leave showInput empty (defaults false)
 * 		- You will want to make a value-setter pair with React.useState hook in your form component.
 * 		- This value is your preview source, setter will be used by these components (see docs below)
 *		- Use PhotoInput.PhotoPreview component as sibling to PhotoInput component. Pass required props (see docs Below)
 * 		- Preview component should now control hidden PhotoInput and update value in useForm hook.
 *
 * - Resetting the Value
 * 		- If you are planning on doing anything that needs to reset the value of this input, wrap the PhotoInput component in PhotoInput.ResetWrapper.
 * 		- You can then use PhotoInput.handleResetPhotoInput with required arg (see below) and this will reset the input, the value, and the preview.
 *
 * - Important Awareness:
 * 		- This input is not setting the preview source value as the value in the form Data. Because of this, you may need to do some work with the
 * 		  file on your server such as encoding to base64 or something similar. It is just storing the file as value for use in Multipart Form transactions while
 * 		  the preview sources are results from a FileReader being read as a DataUrl.
 * 		- The reset wrapper helps prevent certain scenarios where the input will hold a value that does not match with the form data. You can not pass
 * 		  a dynamic value into the file input, it leads to errors being thrown when something external changes that value (such as resetting the value).
 * 		  This wrapper helps remove the old and render a new input with no value when the form value is reset.
 *
 * - Current Improvement Plans:
 * 		- Create a local context to wrap components so redundant props can be passed into one wrapper and internally distributed.
 * 		- Add button to Preview that can clear the file selection
 *
 */

/**
 * --------------------------
 * ==> PHOTO INPUT
 * --------------------------
 * - A component that returns a functional file input that will select photos.
 * - By default, the input is hidden. It should be paired with PhotoInput.PhotoPreview component which will use this and provide preview.
 *
 * COMPONENTS:
 *  - PhotoInput.PhotoPreview
 *  - PhotoInput.ResetWrapper
 *
 * METHODS
 *  - PhotoInput.clickPhotoInput
 *  - PhotoInput.handleResetPhotoInput
 *  - PhotoInput.setPhotoPreviewResult
 *
 * @param {Function} setterCallback - this setter should be from a useState hook or similar that is setting the photo preview source
 * @param {Function} onChange - This onChange should be the one provided by useForm hook in project 'hooks' folder.
 * @param {Boolean} showInput - [default: false] - if PhotoInput.PhotoPreview will not be used, you can reveal the default input.
 *
 * @returns a file input for selecting photos in a form.
 */

const PhotoInput = ({ showInput = false, setterCallback, name, onChange }: PhotoInputInterface) => (
	<div style={{ display: showInput ? '' : 'none' }} id={`fileInputWrapper_${name}`}>
		<Input
			id={`fileSelect_${name}`}
			type='file'
			accept='.png,.jpg,.jpeg'
			onChange={(e: React.SyntheticEvent) => PhotoInput.setPhotoPreviewResult(e, setterCallback, onChange)}
			name={name}
		/>
	</div>
);

/**
 *---------------------------------
 * ==> PHOTO PREVIEW
 *---------------------------------
 * A component that will communicate when there is no photo selected, can be clicked to open native fs and select
 * new image file, and displays preview of image currently selected by input
 *
 * @param {string} preview - a dataURL that will be used as image source for the preview
 * @param {string} name - the name used for the file input; required to target file input onClick
 *
 * @returns a photo preview that can also be clicked to select a new file for PhotoInput
 */
PhotoInput.PhotoPreview = ({ preview, name }: { preview: any; onClick?: any; name: string }) => {
	const RenderPreview = () => {
		const [foundEl, setFoundEl] = React.useState<any>(null);
		const [checkedForEl, toggleCheckedForEl] = React.useState(false);

		const onPreviewClick = () => PhotoInput.clickPhotoInput(name);

		React.useEffect(() => {
			if (!checkedForEl) {
				const inputEl = document.getElementById(`fileSelect_${name}`);
				setFoundEl(inputEl);
				toggleCheckedForEl(true);
			}
			// eslint-disable-next-line react-hooks/exhaustive-deps
		}, []);

		return (
			<div className={`${Style.Wrapper} photo-file-input-preview`} onClick={onPreviewClick}>
				{!foundEl && checkedForEl ? (
					<div className={Style.NoPreview} style={{ backgroundColor: 'red' }}>
						<p>Missing input with matching name</p>
					</div>
				) : preview === '' ? (
					<div className={Style.NoPreview}>
						<p>Add</p>
						<p>Photo</p>
					</div>
				) : (
					<img src={preview ? preview : ''} alt='album_photo_upload_preview' />
				)}
			</div>
		);
	};

	return <RenderPreview />;
};

/**
 * ----------------------
 * ==> ResetWrapper
 * ----------------------
 * A component that should be factored out eventually by a context. This component gets targeted as the dom position for
 * replacing the file input with a new on in the exact same spot in the DOM tree. More conveniant and predicatable than
 * traversing the DOM and checking sibling/parent scenarios to render the new one. Read above for more info on the reseting approach.
 *
 * @param {string} name - the key for the photo in the form values; should be same as the input's name.
 * @param {JSX.Element} children - should be a PhotoInput component that uses the same name passed as prop into this
 *
 * @returns a wrapper that is used internally to reset the file input
 */
PhotoInput.ResetWrapper = ({ name, children }: { name: string; children: JSX.Element }) => (
	<div id={`fileInputOuter_${name}`}>{children}</div>
);

/**
 * --------------------------
 * => setPhotoPreviewResult
 * --------------------------
 * A method that will generate and set an image preview using FileReader.
 *
 * @param {event} e - File input onchange event. Used to get the file for preview value; and pass on to onChange
 * @param {Function} onChange - Form onChange used to set the value before setting the preview source
 * @param {Function} callback - a setter that is being used for the photo preview. The result passed into this can be used as an img src
 */

PhotoInput.setPhotoPreviewResult = (e: any, callback: Function, onChange: Function) => {
	onChange(e);

	const file = e.target.files[0];
	const reader = new FileReader();

	if (file && reader) {
		reader.readAsDataURL(file);

		reader.onloadend = () => {
			callback(reader.result);
		};
	}
};

/**
 * ----------------------------
 * => handleResetPhotoInput
 * ----------------------------
 * A function that will reset the photo input. Setting the value or using the value in form state can throw an error when changing or clearing values.
 * Becaus of this, we remove the input and replce it with a new instance of the component; clearning out the file and reseting the value here, but only
 * for the form data, it is not passed into the file inputs.
 *
 * @param {string} fileKey - The key being used to store the file in the form's state. Will also be used for IDs
 * @param {Function} previewSetter - a setter from a useState hook that will set a preview src
 * @param {Function} valueSetter - this function should be provided by the useForm hook as 'setValue' function.
 * @param {Function} onChange - this onChange should be provided by the useForm hook as 'on
 */

PhotoInput.handleResetPhotoInput = (
	fileKey: string,
	previewSetter: Function,
	valueSetter: Function,
	onChange: Function
) => {
	// Get wrappers
	let inputWrapperParent = document.getElementById(`fileInputOuter_${fileKey}`); // Ref parent element
	let existingInputEl = document.getElementById(`fileInputWrapper_${fileKey}`); // Ref existing photo by custom ID

	if (inputWrapperParent && existingInputEl) {
		// if checked, photo input should be reset with new empty input
		if (existingInputEl) existingInputEl.remove(); // Remove potentially populated file input

		// add new input element
		let newInputEl = document.createElement('div') as HTMLElement; // create new inputWrapper
		newInputEl.id = `fileInputWrapper_${fileKey}`; // assign ID used by this function to later remove again if necessary
		newInputEl.style.display = 'none'; // The UI does not display this input, just uses its functionality
		inputWrapperParent.insertAdjacentElement('beforeend', newInputEl); // Add new inputWrapper to inputParent

		let newInputRoot = ReactDOM.createRoot(newInputEl); // create react Root ref to input wrapper

		valueSetter({ [fileKey]: '' }); // Should reset the actual value being held in form state
		previewSetter(''); // resets the value of the photo preview in form's useState hook for the value

		// Create new react element to replace what we removed
		let newJSXElement = React.createElement(() => (
			<Input
				id={`fileSelect_${fileKey}`}
				type='file'
				onChange={(e: React.SyntheticEvent) => PhotoInput.setPhotoPreviewResult(e, previewSetter, onChange)}
				name={fileKey}
			/>
		));

		// render empty file input into new removable wrapper
		newInputRoot.render(newJSXElement);
	}
};

/**
 * ------------------------
 * ==> clickPhotoInput
 * ------------------------
 * A method that will target and click the file input. Exposed for use but handled internally be default;
 *
 * @param {string} name - same name prop passed into PhotoInput as name
 */
PhotoInput.clickPhotoInput = (name: string) => document.getElementById(`fileSelect_${name}`)?.click();

// ==> EXPORTS
export default PhotoInput;
