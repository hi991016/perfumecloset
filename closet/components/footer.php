<?php
    $url = $_SERVER['REQUEST_URI'];
?>

<?php if (
    $url == '/cam/closet/collection/3/' ||
    $url == '/cam/closet/collection/perfume-of-perfume/'
) : ?>
    <footer class="l-footer js-footer js-delayObj" style="<?= $url == '/cam/closet/collection/perfume-of-perfume/' ? 'opacity: 1' : '' ?>">
        <div class="l-footer__inner">
            <dl class="l-footer__dl">
                <dt class="l-footer__dl_dt">Online Store</dt>
                <dd class="l-footer__dl_dd"><a href="https://www.asmart.jp/perfumecloset/" target="_blank"
                        class="m-arwLineLink type-size-m"><span class="m-arwLineLink__txt">A!SMART</span><span
                            class="m-arwLineLink__arw"></span></a></dd>
                <dt class="l-footer__dl_dt">Link</dt>
                <dd class="l-footer__dl_dd"><a href="http://www.perfume-web.jp/" target="_blank"
                        class="m-arwLineLink type-size-m"><span class="m-arwLineLink__txt">Perfume Official
                            Site</span><span class="m-arwLineLink__arw"></span></a></dd>
                <dt class="l-footer__dl_dt">Share</dt>
                <dd class="l-footer__dl_dd type-share">
                    <ul class="m-shareIcons type-footer">
                        <li><a href="https://www.facebook.com/sharer.php?u=http://www.perfume-web.jp/cam/closet/"
                                target="_blank" class="m-shareIcons__fb"></a></li>
                        <li><a href="https://twitter.com/intent/tweet?text=Perfume%20Closet&amp;url=http%3A%2F%2Fwww.perfume-web.jp%2Fcam%2Fcloset%2F&amp;hashtags=prfm%2CPerfumeCloset"
                                target="_blank" class="m-shareIcons__tw"></a></li>
                    </ul>
                </dd>
            </dl>
            <p class="l-footer__copyright">&copy; AMUSE INC., All Rights Reserved.</p>
        </div>
    </footer>
<?php else : ?>
    <footer class="c-footer">
        <table>
            <tr>
                <td>Online Store</td>
                <td><a href="https://www.asmart.jp/perfumecloset/" class="c-link1">A!SMART</a></td>
            </tr>
            <tr>
                <td>Link</td>
                <td><a href="http://www.perfume-web.jp/" class="c-link1">Perfume Official Site</a></td>
            </tr>
            <tr>
                <td>Share</td>
                <td>
                    <?php if (
                            $url == '/cam/closet/collection/jewelry/' || 
                            $url == '/cam/closet/collection/sneakers-dance-heel/'
                        ) : ?>
                    <div class="addthis_inline_share_toolbox_msjb">
                        <ul class="m-shareIcons type-footer">
                            <li><a href="https://www.facebook.com/sharer.php?u=http://www.perfume-web.jp/cam/closet/"
                                    target="_blank" class="m-shareIcons__fb"></a></li>
                            <li><a href="https://twitter.com/intent/tweet?text=Perfume%20Closet&amp;url=http%3A%2F%2Fwww.perfume-web.jp%2Fcam%2Fcloset%2F&amp;hashtags=prfm%2CPerfumeCloset"
                                    target="_blank" class="m-shareIcons__tw"></a></li>
                        </ul>
                    </div>
                    <?php else : ?>
                    <div class="addthis_inline_share_toolbox_msjb"></div>
                    <?php endif; ?>
                </td>
            </tr>
        </table>
        <div class="c-footer__copy">© AMUSE INC., All Rights Reserved.</div>
    </footer>
    
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<?php endif; ?>
