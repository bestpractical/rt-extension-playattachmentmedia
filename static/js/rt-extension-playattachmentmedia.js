    function makePlayAttachmentMediaElement(href) {
        // first decode any URI or entity encodings
        href = jQuery("<textarea>").html( decodeURIComponent(href) ).text();

        var element = '';
        var regex   = /Attachment\/\d+\/(\d+)\/(.*\.)(.*)$/;
        var match   = href.match(regex);
        if ( match && ( match.length == 4 ) ) {
            // check if the modal has been appended to the body yet
            if ( ! jQuery("#playAttachmentMedia").length ) {
                _appendModal();
            }

            // attachment file extension is in captured group match[3]
            var type = _getMediaTypeForExtension(match[3]);
            if ( type.length > 0 ) {
                if ( type.includes("audio") ) {
                  element = jQuery('\
<br />\
<audio controls preload="metadata" style="zoom:80%;border-radius:3px;background-color:white;margin-bottom:3px;margin-top:3px;" > \
  <source src="' + href + '" type="' + type + '"> \
</audio>');
                }
                else {
                  element = jQuery('\
<button type="button" class="btn play-attachment" data-toggle="modal" data-target="#playAttachmentMedia" data-modal-href="' + href + '" data-modal-type="' + type + '" > \
  <span class="far fa-play-circle" alt="' + RT.I18N.Catalog.play_attachment + '" data-toggle="tooltip" data-placement="bottom" data-original-title="' + RT.I18N.Catalog.play_attachment + '"></span> \
</button>');
                  // set title attribute to take care of encoding
                  element.attr('data-modal-title', match[2] + match[3]);
                }
            }
        }

        return element;
    };

    var _typeForExt = {
        'flac': 'audio/flac',
        'mp3':  'audio/mp3',
        'mp4':  'video/mp4',
        'ogg':  'video/ogg',
        'oga':  'video/ogg',
        'ogv':  'video/ogg',
        'ogx':  'video/ogg',
        'spx':  'video/ogg',
        'opus': 'video/ogg',
        'wav':  'audio/wav',
        'wave': 'audio/wav',
        'webm': 'video/webm'
    };
    function _getMediaTypeForExtension(ext) {
        var type = '';

        var allowed = RT.Config.PlayAttachmentMediaAllowed;
        if ( allowed.includes( ext.toLowerCase() ) || allowed.includes('*') ) {
            type = _typeForExt[ ext.toLowerCase() ] || '';
        }

        return type;
    };

    function _appendModal() {
        jQuery("body").append('\
<div class="modal" id="playAttachmentMedia" tabindex="-1" role="dialog"> \
  <div class="modal-dialog" role="document""> \
    <div class="modal-content"> \
      <div class="modal-header"> \
        <h5 class="modal-title">Title</h5> \
        <button type="button" class="close" style="background:#FFFFFF" data-dismiss="modal" aria-label="' + RT.I18N.Catalog.close + '"> \
          <span aria-hidden="true">&times;</span> \
        </button> \
      </div> \
      <div class="modal-body"> \
        <div id="playAttachmentMediaVideo"> \
          <video controls preload="metadata" style="border-radius:3px;margin:0 auto;display:block;max-height:600px;max-width:450px;"> \
            <source src="#" type="video/mp4"> \
          </video> \
        </div> \
      </div> \
      <div class="modal-footer"> \
        <button type="button" class="btn btn-secondary" data-dismiss="modal">' + RT.I18N.Catalog.close + '</button> \
      </div> \
    </div> \
  </div> \
</div>');
        jQuery('#playAttachmentMedia').on(
            'show.bs.modal',
            function(e) {
                // the specifics for this attachment are data attributes on the button opening the modal
                // the title will be URI Component encoded
                var button = jQuery(e.relatedTarget);
                var title  = decodeURIComponent( button.data('modal-title') );
                var href   = button.data('modal-href');
                var type   = button.data('modal-type');

                jQuery(this).find('.modal-title').text(title);
                jQuery(this).find('#playAttachmentMediaVideo video source').attr( 'src', href );
                jQuery(this).find('#playAttachmentMediaVideo video source').attr( 'type', type );
                jQuery(this).find('#playAttachmentMediaVideo video')[0].load();
            }
        );
        jQuery('#playAttachmentMedia').on(
            'hide.bs.modal',
            function(e) {
                // pause playback when modal is closed
                jQuery(this).find('#playAttachmentMediaVideo video')[0].pause();
            }
        );
    };
