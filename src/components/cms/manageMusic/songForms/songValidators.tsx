export async function checkAudioFile(data: any) {
	let errors: any = {};

	if (!data.audio || data.audio === undefined) {
		errors['audio'] = 'You must include an audio file';
	}

	if (typeof data.audio !== 'object') errors['audio'] = 'File must be a valid audio file';

	if (Object.keys(errors).length > 0) return { errors };
	return { valid: true };
}

export async function checkAlbumInfo(data: any) {
	let errors: any = {};

	if (!data.existingAlbum) {
		if (!data.newAlbumArtist) errors['newAlbumArtist'] = 'new album requires artist name';
		if (!data.newAlbumTitle) errors['newAlbumTitle'] = 'new album requires a title';
		if (!data.newAlbumYear) errors['newAlbumYear'] = 'new album requires album release year';
		if (!data.newAlbumPhoto) errors['newAlbumPhoto'] = 'new album requires photo';
	} else {
		if (typeof data.existingAlbum !== 'string') {
			errors['existingAlbum'] = 'Existing album must have a valid ID string';
		}
	}

	if (Object.keys(errors).length > 0) return { errors };

	return { valid: true };
}

export async function checkSongDetails(data: any) {
	let errors: any = {};

	if (!data.useAlbumYear && (data.year === null || data.year === ''))
		errors['year'] = 'Use album year or provide song year';
	if (data.title === '' || !data.title) errors['title'] = '"Song Title" is required';
	if (data.nominated === true && (data.nominatedAward === '' || data.nominatedAward === null))
		errors['nominatedAward'] = 'You must include the title of the nominated award';

	if (Object.keys(errors).length > 0) return { errors };

	return { valid: true };
}

export async function checkPhotoRequirements(data: any) {
	let errors: any = {};

	if (!data.useAlbumPhoto && !data.photo) {
		errors['photo'] = 'Use album photo or select photo for song';
	}

	if (
		data.newAlbumArtist &&
		(data.newAlbumPhoto === undefined ||
			typeof data.newAlbumPhoto !== 'object' ||
			(data.useAlbumPhoto && !data.newAlbumPhoto && !data.existingAlbum))
	) {
		errors['newAlbumPhoto'] = 'If you are using album photo, you must select or add a new album';
	}

	if (Object.keys(errors).length > 0) return { errors };
	return { valid: true };
}

export async function validateNewSongUpload(data: any) {
	let { errors: albumErrors } = await checkAlbumInfo(data);
	let { errors: audioErrors } = await checkAudioFile(data);
	let { errors: photoErrors } = await checkPhotoRequirements(data);
	let { errors: detailsErrors } = await checkSongDetails(data);
	let errors: any = { ...albumErrors, ...audioErrors, ...photoErrors, ...detailsErrors };
	if (Object.keys(errors).length > 0) return { errors };

	return { valid: true };
}
