use lib '.';
use inc::Module::Install;

RTx     'RT-Extension-PlayAttachmentMedia';
license 'gpl_2';
repository 'https://github.com/bestpractical/rt-extension-playattachmentmedia';

requires_rt '5.0.0';
rt_too_new '5.2.0';

sign;
WriteAll;
