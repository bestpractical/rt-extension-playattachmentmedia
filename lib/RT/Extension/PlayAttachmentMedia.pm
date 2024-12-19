use strict;
use warnings;

package RT::Extension::PlayAttachmentMedia;

our $VERSION = '0.01';

RT->AddJavaScript('rt-extension-playattachmentmedia.js');
RT->AddStyleSheets('rt-extension-playattachmentmedia.css');

=head1 NAME

RT-Extension-PlayAttachmentMedia - Allow playback of audio/video ticket attachments

=head1 DESCRIPTION

This extension allows RT to play audio or video ticket attachments directly in
the browser without having to download them.

The following media format file extensions are allowed by default:

=over

=item flac: 'audio/flac'

=item mp3 : 'audio/mp3'

=item mp4 : 'video/mp4'

=item ogg : 'video/ogg'

=item oga : 'video/ogg'

=item ogv : 'video/ogg'

=item ogx : 'video/ogg'

=item spx : 'video/ogg'

=item opus: 'video/ogg'

=item wav : 'audio/wav'

=item wave: 'audio/wav'

=item webm: 'video/webm'

=back

If you want to allow only some of these formats see the
C<$PlayAttachmentMediaAllowed> config option below.

=head1 RT VERSION

Works with RT 5

=head1 INSTALLATION

=over

=item C<perl Makefile.PL>

=item C<make>

=item C<make install>

May need root permissions

=item Edit your F</opt/rt5/etc/RT_SiteConfig.pm>

Add this line:

    Plugin('RT::Extension::PlayAttachmentMedia');

=item Clear your mason cache

    rm -rf /opt/rt5/var/mason_data/obj

=item Restart your webserver

=back

=head1 CONFIGURATION

=head2 C<@PlayAttachmentMediaAllowed>

Control what media formats are allowed:

    Set( @PlayAttachmentMediaAllowed, ( qw( mp3 mp4 ) ) );

include only the file extensions for formats you want to allow.

=head1 AUTHOR

Best Practical Solutions, LLC E<lt>modules@bestpractical.comE<gt>

=head1 LICENSE AND COPYRIGHT

This software is Copyright (c) 2024 by BPS

This is free software, licensed under:

  The GNU General Public License, Version 2, June 1991

=cut

1;
