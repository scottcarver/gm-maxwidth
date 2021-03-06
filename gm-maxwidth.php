<?php
/**
 * Plugin Name:       Gm Maxwidth
 * Description:       Example block written with ESNext standard and JSX support – build step required.
 * Requires at least: 5.8
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            The WordPress Contributors
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       gm-maxwidth
 *
 * @package           create-block
 */

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/block-editor/tutorials/block-tutorial/writing-your-first-block-type/
 */
function create_block_gm_maxwidth_block_init() {
	register_block_type( __DIR__ );
}
add_action( 'init', 'create_block_gm_maxwidth_block_init' );

/*
// Add Scripts.
wp_enqueue_scripts(
	'gutenberg_agencyblocks-cgb-block-js', // Handle.
	plugins_url('/build/index.js', dirname(__FILE__)), // Block.build.js: We register the block here. Built with Webpack.
	array(
		'wp-api-fetch', 
		'wp-blocks', 
		'wp-i18n', 
		'wp-element', 
		'wp-editor', 
		'wp-plugins', 
		'wp-edit-post'
	), // Dependencies, defined above.
	// filemtime( plugin_dir_path( __DIR__ ) . 'build/index.js' ), // Version: filemtime — Gets file modification time.
	true // Enqueue the script in the footer.
);
*/


function custom_width_css() {
	// everything is compiled with grunt
	
	wp_enqueue_style( 'gm-width', plugin_dir_url( __FILE__ ). '/build/style-index.css', false );


} add_action('wp_enqueue_scripts', 'custom_width_css');


 // this will remove the stylesheet when init fires
 add_action('admin_init','remove_default_admin_stylesheets');
 // this is your function to deregister the default admin stylesheet
 function remove_default_admin_stylesheets() {
 	// wp_deregister_style('wp-reset-editor-styles');
 }