/**
 * This object is not meant for a bunch of styling options. Theme settings can be set
 * in the 'sass' directory of the project. You can then access variables from the Style
 * object imported from component sass module.
 *
 * DEFAULT_MAX_WIDTH will be moved out of here at some points and applied through above
 * approach. This object should contain ID's and Classnames that may need to be globaly available
 * for use by many components and easily changed in refactors.
 */

const layoutGlobals = {
	DEFAULT_MAX_WIDTH: '1400px' as string,
	DESKTOP_PLAYER_HEIGHT: '70px' as string,
	APP_CONTAINER_ID: 'app-container' as string,
	VIEW_OUTER_ID: 'wrapper-outer' as string,
	VIEW_INNER_ID: 'wrapper-inner' as string,
};

export default layoutGlobals;
