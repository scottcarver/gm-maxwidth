// Import JS
import { registerBlockType } from '@wordpress/blocks';
import Edit from './edit';
import save from './save';

// Import CSS
import './style.scss';

// Register Block
registerBlockType( 'create-block/gm-maxwidth', {
	edit: Edit,
	save,
});
