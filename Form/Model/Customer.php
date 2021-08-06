<?php
/**
 * Copyright © Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */
declare(strict_types=1);

namespace My\Form\Model;

/**
 * Class AddFeedback
 * @package Baskar\Feedback\Model
 */
class Customer extends \Magento\Framework\Model\AbstractModel
{
    public function _construct()
    {
        $this->_init("My\Form\Model\ResourceModel\Customer");
    }

}
