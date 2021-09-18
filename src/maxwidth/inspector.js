/**
 * WordPress Dependencies
 */
const { __ } = wp.i18n;

const { BlockControls, InspectorControls, ColorPalette } = wp.editor;
const { MediaUpload } = wp.blockEditor;

const {
	DropdownMenu,
	PanelBody,
	Button,
	ButtonGroup,
	SelectControl,
	ToggleControl,
	RangeControl,
	PanelRow,
	BaseControl,
	Toolbar,
	Tooltip
} = wp.components;

const { Fragment } = wp.element;

/**
 * Internal Dependencies
 */
import classnames from "classnames";
import icons from "./iconsBlunt";

/**
 *
 * @param {object} props component props
 * @returns {object} Component
 */
const Inspector = props => {
	// Attributes
	const { attributes, setAttributes } = props;
	const { alignment } = attributes;

	const changeWidth = newWidth => {
		if (newWidth == alignment) {
			console.log("change to Content width");
			setAttributes({ alignment: "content" });
		} else {
			console.log("change to " + newWidth);
			setAttributes({ alignment: newWidth });
		}
	};

	const dynamicClasses = newWidth => {
		return classnames("components-icon-button", "components-toolbar__control", {
			"is-active": alignment == newWidth
		});
	};

	// Inspector Controls
	return (
		<Fragment>
			<BlockControls key="custom-controls">
				<Toolbar>
					{/* Narrow */}
					<Tooltip text={__("Narrow", "jsforwpblocks")}>
						<Button className={dynamicClasses("narrow")} onClick={() => changeWidth("narrow")}>
							{icons.narrow}
						</Button>
					</Tooltip>

					{/* Inset */}
					<Tooltip text={__("Inset", "jsforwpblocks")}>
						<Button className={dynamicClasses("inset")} onClick={() => changeWidth("inset")}>
							{icons.inset}
						</Button>
					</Tooltip>

					{/* Content */}
					<Tooltip text={__("Content", "jsforwpblocks")}>
						<Button className={dynamicClasses("content")} onClick={() => changeWidth("content")}>
							{icons.content}
						</Button>
					</Tooltip>

					{/* Outset */}
					<Tooltip text={__("Outset", "jsforwpblocks")}>
						<Button className={dynamicClasses("outset")} onClick={() => changeWidth("outset")}>
							{icons.outset}
						</Button>
					</Tooltip>

					{/* Wide */}
					<Tooltip text={__("Wide", "jsforwpblocks")}>
						<Button className={dynamicClasses("wide")} onClick={() => changeWidth("wide")}>
							{icons.wide}
						</Button>
					</Tooltip>

					{/* FullWidth */}
					<Tooltip text={__("Fullwidth", "jsforwpblocks")}>
						<Button className={dynamicClasses("fullwidth")} onClick={() => changeWidth("fullwidth")}>
							{icons.fullwidth}
						</Button>
					</Tooltip>
				</Toolbar>
			</BlockControls>

			<InspectorControls>
				<PanelBody title={__("Width Settings")} initialOpen={false} icon="sos">
					<PanelRow>
						{/* Screen Sizes */}
						<BaseControl
							id="maxwidth-editor"
							label="Max Width"
							help="Set a Maxwidth for this Screen Size"
							className="maxwidthInspector"
						>
							<Toolbar>
								{/* Narrow */}
								<Tooltip text={__("Narrow", "jsforwpblocks")}>
									<Button className={dynamicClasses("narrow")} onClick={() => changeWidth("narrow")}>
										{icons.narrow}
									</Button>
								</Tooltip>

								{/* Inset */}
								<Tooltip text={__("Inset", "jsforwpblocks")}>
									<Button className={dynamicClasses("inset")} onClick={() => changeWidth("inset")}>
										{icons.inset}
									</Button>
								</Tooltip>

								{/* Content */}
								<Tooltip text={__("Content", "jsforwpblocks")}>
									<Button className={dynamicClasses("content")} onClick={() => changeWidth("content")}>
										{icons.content}
									</Button>
								</Tooltip>

								{/* Outset */}
								<Tooltip text={__("Outset", "jsforwpblocks")}>
									<Button className={dynamicClasses("outset")} onClick={() => changeWidth("outset")}>
										{icons.outset}
									</Button>
								</Tooltip>

								{/* Wide */}
								<Tooltip text={__("Wide", "jsforwpblocks")}>
									<Button className={dynamicClasses("wide")} onClick={() => changeWidth("wide")}>
										{icons.wide}
									</Button>
								</Tooltip>

								{/* FullWidth */}
								<Tooltip text={__("Fullwidth", "jsforwpblocks")}>
									<Button className={dynamicClasses("fullwidth")} onClick={() => changeWidth("fullwidth")}>
										{icons.fullwidth}
									</Button>
								</Tooltip>
							</Toolbar>
						</BaseControl>
					</PanelRow>
				</PanelBody>
			</InspectorControls>
		</Fragment>
	);
};

export default Inspector;
