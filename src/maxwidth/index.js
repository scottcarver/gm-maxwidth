/* Based on this: https://github.com/lubusIN/block-background */
/* Ghostkit has a similar, perhaps better example */

/**
 * External Dependencies
 */
import assign from "lodash/assign";

import classnames from "classnames";

/**
 * WordPress Dependencies
 */
const { addFilter } = wp.hooks;
const { Fragment } = wp.element;
const { createHigherOrderComponent } = wp.compose;

/**
 * Internal Dependencies
 */
// import backgroundSettings from "./data/attributes";
import Inspector from "./inspector";
// import getStyle from "./utils/get-style";
// import "./style.scss";

/**
 * Filters registered block settings, extending attributes with background settings
 *
 * @param {Object} settings Original block settings.
 * @return {Object} Filtered block settings.
 */

function addAttributes(settings) {
	const maxwidthSettings = {
		alignment: {
			type: "string",
			default: "content"
		}
	};

	// console.log("settings were");
	// console.log(settings);
	// Use Lodash's assign to gracefully handle if attributes are undefined
	settings.attributes = assign(settings.attributes, maxwidthSettings);
	return settings;
}

/**
 * Override the default edit UI to include a new block inspector control for
 * background settings.
 *
 * @param {function|Component} BlockEdit Original component.
 * @return {string} Wrapped component.
 */
const withInspectorControl = createHigherOrderComponent(BlockEdit => {
	return props => {
		// console.log("registered");
		// console.log(props.name);
		const isImage = props.name == "core/image";
		const isSection = props.name == "core/paragraph";
		const isHeading = props.name == "core/heading";
		const isGroup = props.name == "core/group";
		const isSelected = props.isSelected;
		const isActive = (isImage || isSection || isHeading || isGroup) && isSelected;
		// const isActive = isSelected;
		// Modify only for Image
		return (
			<Fragment>
				<BlockEdit {...props} />
				{isActive && <Inspector {...{ ...props }} />}
			</Fragment>
		);
	};
}, "withInspectorControl");

/**
 * Override the default block element to add background wrapper props.
 *
 * @param  {Function} BlockListBlock Original component
 * @return {Function}                Wrapped component
 */

const withWidth = createHigherOrderComponent(BlockListBlock => {
	return props => {
		let wrapperProps = props.wrapperProps;
		// let styles = getStyle(props.block.attributes);
		// console.log("got the styles!");
		// console.log(props);

		const widthClass = "wp-block--" + props.block.attributes.alignment;
		const typeClass = "wp-block-" + props.name.replace("core/", "");
		let bothclasses = typeClass;

		// if (false) {}
		bothclasses = bothclasses + " " + widthClass;

		wrapperProps = {
			...wrapperProps,
			style: '',
			// style: getStyle(props.block.attributes)
			// "data-width": props.block.attributes.alignment
			// className: props.block.attributes.alignment
		};

		return <BlockListBlock {...{ ...props }} className={bothclasses} wrapperProps={wrapperProps} />;
	};
}, "withWidth");

/**
 * Override props assigned to save component to inject background atttributes
 *
 * @param {Object} extraProps Additional props applied to save element.
 * @param {Object} blockType  Block type.
 * @param {Object} attributes Current block attributes.
 *
 * @return {Object} Filtered props applied to save element.
 */
function addWidth(extraProps, props, attributes) {
	const cleanName = props.name.replace("core/", "");
	const isParagraph = props.name == "core/paragraph";
	const isImage = props.name == "core/image";
	const isHeading = props.name == "core/heading";
	const isGroup = props.name == "core/group";

	const { alignment } = attributes;

	const optionalClass = (isParagraph || isImage || isHeading || isGroup) ? "wp-block-" + cleanName : null;
	const isWidthEnabled = isParagraph || isImage || isHeading || isGroup;
	// console.log("what is this attributes here?");
	// console.log(attributes);

	if (alignment && isWidthEnabled) {
		// this was adding a background which was
		// extraProps.style = assign(extraProps.style, getStyle(attributes));
		extraProps.className = classnames(extraProps.className, "wp-block--" + alignment, optionalClass);
	}

	return extraProps;
}

// This was adding Background Settings I don't need
addFilter("blocks.registerBlockType", "lubus/background/attribute", addAttributes);

/* When *Editing a Block* add an additional Panel, here called Background Settings */
addFilter("editor.BlockEdit", "lubus/background/inspector", withInspectorControl);

// Inside the *Editor* Add Additional props onto each Block (width and type classes)
addFilter("editor.BlockListBlock", "lubus/background/withWidth", withWidth);

// When *Saving* Add Additional Props to each Block (classes for type and width)
addFilter("blocks.getSaveContent.extraProps", "lubus/background/addWidth", addWidth);

/* Available Filters:
1) registerBlockType
2) getSaveElement
3) getSaveContent.extraProps
4) getBlockDefaultClassName
5) blocks.switchToBlockType.transformedBlock
6) blocks.getBlockAttributes
7) editor.BlockEdit
8) editor.BlockListBlock
*/