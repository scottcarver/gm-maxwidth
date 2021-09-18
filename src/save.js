// Import JS
import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';

// Export JS
export default function save() {
	return (
		<p { ...useBlockProps.save() }>
			{ __(
				'Gm Maxwidth – hello from the saved content!',
				'gm-maxwidth'
			) }
		</p>
	);
}
