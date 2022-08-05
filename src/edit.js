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
import { useBlockProps,MediaUploadCheck,RichText,MediaUpload } from '@wordpress/block-editor';
import {Button,IconButton} from '@wordpress/components';
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
		<div>
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
				tagName     = 'h2'
				placeholder = 'Enter Service Title'
				value       = { attributes.title }
				onChange    = { (title) => setAttributes( { title } ) }
				style       = {{ color: attributes.titleColor }}
			/>
			<RichText
				tagName     = 'p'
				placeholder = 'Enter Service Description'
				value       = { attributes.description }
				onChange    = { (description) => setAttributes( { description } ) }
				style       = {{ color: attributes.descriptionColor }}
			/>
		</div>
	);
}
