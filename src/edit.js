/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-block-editor/#useBlockProps
 */
import { useBlockProps,InspectorControls,RichText,MediaUpload,ColorPalette } from '@wordpress/block-editor';
import {PanelBody,IconButton,RangeControl} from '@wordpress/components';
/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */

export default function Edit({attributes,setAttributes}) {
	const onFileSelect = (img) => {
		setAttributes({
			imgURL:img.url,
			imgID:img.id,
			imgALT:img.alt
		})
	}
	const onRemoveImg = () => {
		setAttributes({
			imgURL:null,
			imgID:null,
			imgALT:null
		})
	}
	return (
		<>
		<InspectorControls>
			<PanelBody title = {'Title Settings'} initialOpen = {false}>
				<p><strong>Font Size</strong></p>
				<RangeControl
					value    = { attributes.titleFontSize }
					onChange = { (titleFontSize) => setAttributes( { titleFontSize } ) }
					min      = { 0 }
					max      = { 100 }
					step     = { 2 }
				/>

				<p><strong>Color</strong></p>
				<ColorPalette 
					value    = { attributes.titleColor }
					onChange = { (titleColor) => setAttributes( { titleColor } )} />
			</PanelBody>

			<PanelBody title = {'Description Settings'} initialOpen = {false}>
				<p><strong>Font Size</strong></p>
				<RangeControl
					value    = { attributes.descriptionFontSize }
					onChange = { (descriptionFontSize) => setAttributes( { descriptionFontSize } ) }
					min      = { 0 }
					max      = { 100 }
					step     = { 2 }
				/>

				<p><strong>Color</strong></p>
				<ColorPalette 
					value    = { attributes.descriptionColor }
					onChange = { (descriptionColor) => setAttributes( { descriptionColor } )} />
			</PanelBody>
		</InspectorControls>

		<div {...useBlockProps()}>
			<div className='media-wrapper'>
			{
				(attributes.imgURL) ? (
					<div className='img-upload-wrapper'>
						<img 
							src    = {attributes.imgURL}
							alt    = {attributes.imgALT}
							height = '200'
							width  = '200'
						/>
						<br />
						<IconButton
							icon    = "minus"
							onClick = {onRemoveImg}
						>
						Remove Image
						</IconButton>
					</div>
				): (
					<MediaUpload 
						onSelect = {onFileSelect}
						value    = {attributes.imgID}
						render   = {({open}) => 
							<IconButton
								icon    = "plus"
								onClick = {open}
							>
							Add Image
							</IconButton>
						}
					/>
				)
			}
			</div>

			<RichText
				className	='service-title'
				tagName     = 'h2'
				placeholder = 'Enter Service Title'
				value       = { attributes.title }
				onChange    = { (title) => setAttributes( { title } ) }
				style       = {{ color : attributes.titleColor, fontSize : attributes.titleFontSize }}
			/>
			<RichText
				className	='service-description'
				tagName     = 'p'
				placeholder = 'Enter Service Description'
				value       = { attributes.description }
				onChange    = { (description) => setAttributes( { description } ) }
				style       = {{ color : attributes.descriptionColor, fontSize : attributes.descriptionFontSize }}
			/>
		</div>
		</>
	);
}
