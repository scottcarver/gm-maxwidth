// Import JS
import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';

// Import CSS
import './editor.scss';

// Export JS
export default function Edit() {
	return (
		<p { ...useBlockProps() }>
			{ __( 'Gm Maxwidth – hello from the editor!', 'gm-maxwidth' ) }
		</p>
	);
}
